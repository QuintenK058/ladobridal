import { track, session, getUtm } from './track';

const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL as string | undefined;
const SUPABASE_KEY = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined;
const STATE_KEY = 'lado-form-v1';
const MAX_FILES = 5, MAX_FILE_MB = 10;

type Prefill = { date?: string; service?: string; persons?: string; mother?: string; message?: string; calc?: string; step?: number };

const T = {
  nl: {
    step: (n: number) => `Stap ${n} van 5`,
    dateRequired: 'Kies je trouwdatum, of zet “Nog niet bekend” aan.',
    datePast: 'Deze datum ligt in het verleden. Klopt het jaartal?',
    monthRequired: 'Kies een maand en jaar, of “Ik ben flexibel”.',
    choose: 'Maak een keuze om verder te gaan.',
    name: 'Vul je naam in.',
    email: 'Vul een geldig e-mailadres in, bijvoorbeeld naam@voorbeeld.nl.',
    phone: 'Vul je telefoonnummer in, dan kan ik je bellen voor de intake.',
    files: `Je kunt maximaal ${MAX_FILES} foto’s van elk maximaal ${MAX_FILE_MB} MB meesturen.`,
    early: 'Fijn dat je er op tijd bij bent — zomerdata raken snel vol.',
    soon: 'Zomerdata zijn gewild. Ik laat je binnen 2 werkdagen weten of jouw datum nog vrij is.',
    sending: 'Versturen…',
    tooFast: 'Je aanvraag is net verstuurd. Wacht even voordat je het opnieuw probeert.',
    failed: 'Versturen lukte niet. Probeer het opnieuw, of stuur me een WhatsApp of e-mail via info@ladobridal.com.',
    fallback: 'Het formulier is nog niet gekoppeld. Je e-mailprogramma opent nu met je aanvraag erin.',
  },
  en: {
    step: (n: number) => `Step ${n} of 5`,
    dateRequired: 'Choose your wedding date, or switch on “Not decided yet”.',
    datePast: 'This date is in the past. Is the year right?',
    monthRequired: 'Choose a month and year, or “I’m flexible”.',
    choose: 'Make a choice to continue.',
    name: 'Please enter your name.',
    email: 'Please enter a valid email address, e.g. name@example.com.',
    phone: 'Please enter your phone number so I can call you for the intake.',
    files: `You can attach up to ${MAX_FILES} photos of max. ${MAX_FILE_MB} MB each.`,
    early: 'Lovely that you’re early — summer dates fill up fast.',
    soon: 'Summer dates are popular. I’ll let you know within 2 working days whether your date is still free.',
    sending: 'Sending…',
    tooFast: 'Your request was just sent. Please wait a moment before trying again.',
    failed: 'Sending failed. Please try again, or send me a WhatsApp or email via info@ladobridal.com.',
    fallback: 'The form is not connected yet. Your email app will open with your request filled in.',
  },
};

function setError(el: HTMLElement | null, msg: string | null) {
  if (!el) return;
  el.textContent = msg || '';
  el.hidden = !msg;
}

export function initLeadForms() {
  const forms = [...document.querySelectorAll<HTMLFormElement>('[data-lead-form]')];
  const drawer = document.querySelector<HTMLElement>('[data-drawer]');
  const controllers = forms.map(setupForm);
  const primary = controllers[0];

  const openDrawer = (prefill?: Prefill) => {
    if (!primary) return;
    if (!drawer) {
      // Inline form on this page (/contact): scroll to it instead.
      if (prefill) primary.prefill(prefill);
      primary.form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => primary.focusStep(), 500);
      return;
    }
    if (prefill) primary.prefill(prefill);
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('drawer-open');
    document.body.style.overflow = 'hidden';
    (window as any).__lenis?.stop?.(); // eslint-disable-line
    setTimeout(() => primary.focusStep(), 350);
    if (!primary.started) { primary.started = true; track('form_start', { location: location.pathname }); }
  };
  const closeDrawer = () => {
    if (!drawer) return;
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('drawer-open');
    document.body.style.overflow = '';
    (window as any).__lenis?.start?.(); // eslint-disable-line
    lastTrigger?.focus();
  };
  let lastTrigger: HTMLElement | null = null;
  document.addEventListener('click', (e) => {
    const t = (e.target as HTMLElement).closest<HTMLElement>('[data-open-form]');
    if (t) { e.preventDefault(); lastTrigger = t; document.dispatchEvent(new CustomEvent('lado:menu-close')); openDrawer(); }
    if ((e.target as HTMLElement).closest('[data-drawer-close]')) closeDrawer();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer?.classList.contains('is-open')) closeDrawer();
    if (e.key === 'Tab' && drawer?.classList.contains('is-open')) trapFocus(e, drawer.querySelector('.drawer__panel')!);
  });
  document.addEventListener('lado:prefill', (e) => openDrawer((e as CustomEvent<Prefill>).detail));

  // Inline "step 1" date forms in CTA blocks
  document.querySelectorAll<HTMLFormElement>('[data-date-start]').forEach((f) => {
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      lastTrigger = f.querySelector('button');
      const date = (f.querySelector('input[type=date]') as HTMLInputElement).value;
      openDrawer({ date, step: date ? 2 : 1 });
    });
  });

  // /contact?datum=YYYY-MM-DD (no-JS fallback of the CTA form)
  const q = new URLSearchParams(location.search).get('datum');
  if (q && primary && !drawer) primary.prefill({ date: q, step: 2 });
}

function trapFocus(e: KeyboardEvent, root: HTMLElement) {
  const f = [...root.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([type=hidden]):not([disabled]), select, textarea')].filter((x) => x.offsetParent !== null);
  if (!f.length) return;
  const first = f[0], last = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}

function setupForm(form: HTMLFormElement) {
  const lang = (form.dataset.lang as 'nl' | 'en') || 'nl';
  const t = T[lang];
  const steps = [...form.querySelectorAll<HTMLElement>('[data-step]')];
  const btnNext = form.querySelector<HTMLButtonElement>('[data-next]')!;
  const btnBack = form.querySelector<HTMLButtonElement>('[data-back]')!;
  const btnSubmit = form.querySelector<HTMLButtonElement>('[data-submit]')!;
  const label = form.querySelector<HTMLElement>('[data-step-label]')!;
  const progress = form.querySelector<HTMLElement>('[data-progress]')!;
  const unknownToggle = form.querySelector<HTMLInputElement>('[data-date-unknown]')!;
  const unknownFields = form.querySelector<HTMLElement>('[data-unknown-fields]')!;
  const knownDate = form.querySelector<HTMLElement>('[data-known-date]')!;
  const feedback = form.querySelector<HTMLElement>('[data-season-feedback]')!;
  const countryWrap = form.querySelector<HTMLElement>('[data-country]')!;
  const dateInput = form.elements.namedItem('wedding_date') as HTMLInputElement;
  let current = 1;
  const ctl = { form, started: false, prefill, focusStep };

  // today as min date
  const today = new Date(); today.setHours(0, 0, 0, 0);
  dateInput.min = today.toISOString().slice(0, 10);

  function show(n: number, back = false) {
    current = Math.max(1, Math.min(5, n));
    steps.forEach((s) => { const on = Number(s.dataset.step) === current; s.classList.toggle('is-active', on); s.classList.toggle('is-back', on && back); });
    label.textContent = t.step(current);
    progress.style.setProperty('--p', String(current / 5));
    btnBack.hidden = current === 1;
    btnNext.hidden = current === 5;
    btnSubmit.hidden = current !== 5;
    save();
  }
  function focusStep() {
    const s = steps[current - 1];
    (s.querySelector<HTMLElement>('input:not([type=hidden]):not(.hp input), select, textarea') || s.querySelector('legend'))?.focus?.({ preventScroll: true } as FocusOptions);
  }

  function seasonFeedback() {
    const v = dateInput.value;
    let month: number | null = null, monthsAway = 0;
    if (!unknownToggle.checked && v) {
      const d = new Date(v + 'T12:00:00');
      month = d.getMonth() + 1;
      monthsAway = (d.getFullYear() - today.getFullYear()) * 12 + (d.getMonth() - today.getMonth());
    } else if (unknownToggle.checked) {
      const m = (form.elements.namedItem('wedding_month') as HTMLSelectElement).value;
      const y = (form.elements.namedItem('wedding_year') as HTMLSelectElement).value;
      if (m && m !== 'flex') { month = Number(m); if (y && y !== 'flex') monthsAway = (Number(y) - today.getFullYear()) * 12 + (month - 1 - today.getMonth()); else monthsAway = 12; }
    }
    if (month && month >= 5 && month <= 9 && monthsAway >= 0) {
      feedback.textContent = monthsAway >= 9 ? t.early : t.soon;
      feedback.hidden = false;
    } else feedback.hidden = true;
  }

  function validate(n: number): boolean {
    const el = (name: string) => form.elements.namedItem(name) as HTMLInputElement;
    if (n === 1) {
      const err = form.querySelector<HTMLElement>(`#${dateInput.id}-err`);
      if (unknownToggle.checked) {
        const ok = (form.elements.namedItem('wedding_month') as HTMLSelectElement).value && (form.elements.namedItem('wedding_year') as HTMLSelectElement).value;
        setError(form.querySelector<HTMLElement>('[data-error-for=month]'), ok ? null : t.monthRequired);
        setError(err, null);
        return !!ok;
      }
      if (!dateInput.value) { setError(err, t.dateRequired); dateInput.setAttribute('aria-invalid', 'true'); dateInput.focus(); return false; }
      if (new Date(dateInput.value + 'T12:00:00') < today) { setError(err, t.datePast); dateInput.setAttribute('aria-invalid', 'true'); dateInput.focus(); return false; }
      setError(err, null); dateInput.removeAttribute('aria-invalid'); return true;
    }
    if (n >= 2 && n <= 4) {
      const name = ['service', 'region', 'persons'][n - 2];
      const ok = !!form.querySelector(`input[name=${name}]:checked`);
      const err = form.querySelector<HTMLElement>(`[data-error-for=${name}]`);
      setError(err, ok ? null : t.choose);
      if (!ok) form.querySelector<HTMLInputElement>(`input[name=${name}]`)?.focus();
      return ok;
    }
    // step 5
    let ok = true; let firstBad: HTMLInputElement | null = null;
    const check = (name: string, valid: boolean, msg: string) => {
      const i = el(name); const err = form.querySelector<HTMLElement>(`#${i.id}-err`);
      setError(err, valid ? null : msg);
      if (valid) i.removeAttribute('aria-invalid'); else { i.setAttribute('aria-invalid', 'true'); ok = false; firstBad ??= i; }
    };
    check('name', el('name').value.trim().length >= 2, t.name);
    check('email', /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(el('email').value.trim()), t.email);
    check('phone', el('phone').value.replace(/[^\d+]/g, '').length >= 9, t.phone);
    const files = (form.elements.namedItem('files') as HTMLInputElement).files;
    const filesOk = !files || (files.length <= MAX_FILES && [...files].every((f) => f.size <= MAX_FILE_MB * 1024 * 1024));
    check('files', filesOk, t.files);
    (firstBad as HTMLInputElement | null)?.focus();
    return ok;
  }

  // --- state persistence (closing the drawer keeps everything) ---
  function save() {
    const data: Record<string, unknown> = { step: current };
    new FormData(form).forEach((v, k) => { if (k !== 'files' && k !== 'website') data[k] = v; });
    data.date_unknown = unknownToggle.checked;
    session.set(STATE_KEY, JSON.stringify(data));
  }
  function restore() {
    let d: Record<string, any> | null = null; // eslint-disable-line
    try { d = JSON.parse(session.get(STATE_KEY) || 'null'); } catch { d = null; }
    if (!d) return;
    Object.entries(d).forEach(([k, v]) => {
      const f = form.elements.namedItem(k);
      if (!f || k === 'step') return;
      if (f instanceof RadioNodeList) [...f].forEach((r) => ((r as HTMLInputElement).checked = (r as HTMLInputElement).value === v));
      else if ((f as HTMLInputElement).type === 'checkbox') (f as HTMLInputElement).checked = !!v;
      else (f as HTMLInputElement).value = String(v);
    });
    syncUnknown(); syncCountry(); seasonFeedback();
    if (d.step) show(Number(d.step));
  }
  function prefill(p: Prefill) {
    if (p.date) { unknownToggle.checked = false; dateInput.value = p.date; syncUnknown(); }
    const radio = (name: string, v?: string) => { if (!v) return; const r = form.querySelector<HTMLInputElement>(`input[name=${name}][value="${v}"]`); if (r) r.checked = true; };
    radio('service', p.service); radio('persons', p.persons); radio('mother', p.mother);
    if (p.message) (form.elements.namedItem('message') as HTMLTextAreaElement).value = p.message;
    if (p.calc) (form.elements.namedItem('calc') as HTMLInputElement).value = p.calc;
    seasonFeedback();
    let step = p.step ?? current;
    if (p.date && step < 2) step = 2;
    if (p.calc) step = form.querySelector('input[name=service]:checked') ? (p.date ? 3 : 1) : 2;
    show(step);
  }
  function syncUnknown() {
    unknownFields.hidden = !unknownToggle.checked;
    knownDate.hidden = unknownToggle.checked;
    dateInput.disabled = unknownToggle.checked;
  }
  function syncCountry() {
    const v = (form.querySelector('input[name=region]:checked') as HTMLInputElement | null)?.value;
    countryWrap.hidden = v !== 'buitenland';
  }

  unknownToggle.addEventListener('change', () => { syncUnknown(); seasonFeedback(); save(); });
  form.addEventListener('change', (e) => {
    const n = (e.target as HTMLInputElement).name;
    if (n === 'wedding_date' || n === 'wedding_month' || n === 'wedding_year') seasonFeedback();
    if (n === 'region') syncCountry();
    save();
  });
  form.addEventListener('focusin', () => { if (!ctl.started) { ctl.started = true; track('form_start', { location: location.pathname }); } });
  btnNext.addEventListener('click', () => {
    if (!validate(current)) return;
    track('form_step', { step: current });
    show(current + 1); focusStep();
  });
  btnBack.addEventListener('click', () => { show(current - 1, true); focusStep(); });
  // Enter key moves to the next step instead of submitting early
  form.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && current < 5 && (e.target as HTMLElement).tagName === 'INPUT') { e.preventDefault(); btnNext.click(); }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (current < 5) { btnNext.click(); return; }
    if (!validate(5)) return;
    const submitErr = form.querySelector<HTMLElement>('[data-submit-error]');
    const thanks = form.dataset.thanks!;
    const fd = new FormData(form);
    // Honeypot: pretend success, store nothing.
    if (String(fd.get('website') || '').trim()) { location.href = thanks; return; }
    const last = Number(session.get('lado-last-submit') || 0);
    if (Date.now() - last < 30_000) { setError(submitErr, t.tooFast); return; }

    const payload = {
      wedding_date: unknownToggle.checked ? null : fd.get('wedding_date') || null,
      wedding_month: unknownToggle.checked ? String(fd.get('wedding_month') || '') : null,
      wedding_year: unknownToggle.checked ? String(fd.get('wedding_year') || '') : null,
      service: fd.get('service'), region: fd.get('region'), country: fd.get('country') || null, venue: fd.get('venue') || null,
      persons: fd.get('persons'), mother: fd.get('mother') === 'ja',
      name: String(fd.get('name')).trim(), email: String(fd.get('email')).trim(), phone: String(fd.get('phone')).trim(),
      source: fd.get('source') || null, message: fd.get('message') || null, calc: fd.get('calc') ? JSON.parse(String(fd.get('calc'))) : null,
      lang, page: location.pathname, utm: getUtm(), files: [] as string[],
    };
    const dateMonth = payload.wedding_date ? String(payload.wedding_date).slice(0, 7) : `${payload.wedding_year}-${payload.wedding_month}`;

    btnSubmit.disabled = true; const prevLabel = btnSubmit.textContent; btnSubmit.textContent = t.sending;
    try {
      if (SUPABASE_URL && SUPABASE_KEY) {
        const headers = { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` };
        const files = (form.elements.namedItem('files') as HTMLInputElement).files;
        if (files?.length) {
          const folder = crypto.randomUUID();
          for (const [i, f] of [...files].slice(0, MAX_FILES).entries()) {
            const path = `${folder}/${i + 1}-${f.name.replace(/[^\w.-]+/g, '_')}`;
            const r = await fetch(`${SUPABASE_URL}/storage/v1/object/inspiratie/${path}`, { method: 'POST', headers: { ...headers, 'Content-Type': f.type || 'application/octet-stream', 'x-upsert': 'false' }, body: f });
            if (r.ok) payload.files.push(path);
          }
        }
        const res = await fetch(`${SUPABASE_URL}/rest/v1/leads`, { method: 'POST', headers: { ...headers, 'Content-Type': 'application/json', Prefer: 'return=minimal' }, body: JSON.stringify(payload) });
        if (!res.ok) throw new Error(`lead insert ${res.status}`);
      } else {
        // Not connected yet (no Supabase env): hand the request to the visitor's mail app.
        setError(submitErr, t.fallback);
        const body = Object.entries(payload).filter(([k, v]) => v && k !== 'utm' && k !== 'files').map(([k, v]) => `${k}: ${v}`).join('\n');
        location.href = `mailto:info@ladobridal.com?subject=${encodeURIComponent('Aanvraag via ladobridal.com')}&body=${encodeURIComponent(body)}`;
      }
      track('generate_lead', { service: payload.service, region: payload.region, date_month: dateMonth, persons: payload.persons });
      session.set('lado-last-submit', String(Date.now()));
      session.set('lado-thanks-name', payload.name.split(' ')[0]);
      session.del(STATE_KEY);
      setTimeout(() => (location.href = thanks), SUPABASE_URL ? 0 : 1200);
    } catch {
      setError(submitErr, t.failed);
      btnSubmit.disabled = false; btnSubmit.textContent = prevLabel;
    }
  });

  restore();
  return ctl;
}
