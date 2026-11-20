/* Multi-step engine shared by the consult form and the extension-check quiz. */
import { track, session, getUtm } from './track';
import { advise, type QuizAnswers, type MethodKey } from '../data/content';

const URL_ = import.meta.env.PUBLIC_SUPABASE_URL as string | undefined;
const KEY = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined;
const MAX_FILES = 4, MAX_MB = 10;

const T = {
  nl: { step: (n: number, t: number, quiz: boolean) => `${quiz ? 'Vraag' : 'Stap'} ${n} van ${t}`, choose: 'Maak een keuze om verder te gaan.', slots: 'Kies minstens één dagdeel.', name: 'Vul je naam in.', email: 'Vul een geldig e-mailadres in.', phone: 'Vul je telefoonnummer in.', consent: 'Geef toestemming om je te kunnen adviseren.', files: `Maximaal ${MAX_FILES} foto’s van max. ${MAX_MB} MB.`, sending: 'Versturen…', failed: 'Versturen lukte niet. Probeer het opnieuw of neem direct contact op.', fast: 'Je aanvraag is net verstuurd. Wacht even.' },
  en: { step: (n: number, t: number, quiz: boolean) => `${quiz ? 'Question' : 'Step'} ${n} of ${t}`, choose: 'Make a choice to continue.', slots: 'Choose at least one slot.', name: 'Please enter your name.', email: 'Please enter a valid email address.', phone: 'Please enter your phone number.', consent: 'Please give consent so I can advise you.', files: `Max. ${MAX_FILES} photos of max. ${MAX_MB} MB.`, sending: 'Sending…', failed: 'Sending failed. Please try again or contact me directly.', fast: 'Your request was just sent. Please wait a moment.' },
};
const setErr = (el: Element | null | undefined, msg: string | null) => { if (!el) return; el.textContent = msg ?? ''; (el as HTMLElement).hidden = !msg; };

async function store(kind: string, payload: Record<string, unknown>, files: FileList | null) {
  if (!URL_ || !KEY) return false;
  const h = { apikey: KEY, Authorization: `Bearer ${KEY}` };
  const paths: string[] = [];
  if (files?.length) {
    const folder = crypto.randomUUID();
    for (const [i, f] of [...files].slice(0, MAX_FILES).entries()) {
      const path = `${folder}/${i + 1}-${f.name.replace(/[^\w.-]+/g, '_')}`;
      const r = await fetch(`${URL_}/storage/v1/object/haarfotos/${path}`, { method: 'POST', headers: { ...h, 'Content-Type': f.type || 'application/octet-stream' }, body: f });
      if (r.ok) paths.push(path);
    }
  }
  const res = await fetch(`${URL_}/rest/v1/leads`, { method: 'POST', headers: { ...h, 'Content-Type': 'application/json', Prefer: 'return=minimal' }, body: JSON.stringify({ kind, ...payload, files: paths }) });
  if (!res.ok) throw new Error(String(res.status));
  return true;
}

export function initSteps() {
  document.querySelectorAll<HTMLFormElement>('form[data-steps]').forEach(setup);

  // Quiz overlay open/close (any [data-open-quiz] link opens the overlay when present; otherwise follows the link)
  const overlay = document.querySelector<HTMLElement>('[data-quiz="overlay"]');
  let opener: HTMLElement | null = null;
  const open = () => { if (!overlay) return; overlay.classList.add('is-open'); document.documentElement.classList.add('quiz-open'); document.body.style.overflow = 'hidden'; (window as any).__lenis?.stop?.(); overlay.querySelector<HTMLElement>('legend')?.setAttribute('tabindex', '-1'); setTimeout(() => overlay.querySelector<HTMLElement>('input')?.focus(), 60); track('quiz_start', { location: location.pathname }); }; // eslint-disable-line
  const close = () => { if (!overlay) return; overlay.classList.remove('is-open'); document.documentElement.classList.remove('quiz-open'); document.body.style.overflow = ''; (window as any).__lenis?.start?.(); opener?.focus(); }; // eslint-disable-line
  document.addEventListener('click', (e) => {
    const t = (e.target as HTMLElement).closest<HTMLElement>('[data-open-quiz]');
    if (t && overlay) { e.preventDefault(); opener = t; document.dispatchEvent(new CustomEvent('lado:menu-close')); open(); const pre = t.dataset.quizPrefill; if (pre) { const [n, v] = pre.split('='); const r = overlay.querySelector<HTMLInputElement>(`input[name=${n}][value="${v}"]`); if (r) { r.checked = true; overlay.querySelector<HTMLButtonElement>('[data-next]')?.click(); } } }
    if ((e.target as HTMLElement).closest('[data-quiz-close]')) close();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && overlay?.classList.contains('is-open')) close(); });
}

function setup(form: HTMLFormElement) {
  const lang = (form.dataset.lang as 'nl' | 'en') || 'nl'; const t = T[lang];
  const kind = form.dataset.kind || 'consult'; const quiz = kind === 'quiz';
  const steps = [...form.querySelectorAll<HTMLElement>('[data-step]')]; const total = steps.length;
  const next = form.querySelector<HTMLButtonElement>('[data-next]')!, back = form.querySelector<HTMLButtonElement>('[data-back]')!, submit = form.querySelector<HTMLButtonElement>('[data-submit]')!;
  const label = form.querySelector<HTMLElement>('[data-step-label]')!, prog = form.querySelector<HTMLElement>('[data-progress]')!;
  const SKEY = `bylado-${kind}-v1`;
  let cur = 1;

  const show = (n: number, isBack = false) => {
    cur = Math.max(1, Math.min(total, n));
    steps.forEach((s) => { const on = Number(s.dataset.step) === cur; s.classList.toggle('is-active', on); s.classList.toggle('is-back', on && isBack); });
    label.textContent = t.step(cur, total, quiz); prog.style.setProperty('--p', String(cur / total));
    back.hidden = cur === 1; next.hidden = cur === total; submit.hidden = cur !== total; save();
  };
  const focusStep = () => steps[cur - 1].querySelector<HTMLElement>('input:not([type=hidden]), select, textarea')?.focus({ preventScroll: false });

  const validate = (n: number) => {
    const s = steps[n - 1]; let ok = true; let first: HTMLElement | null = null;
    const groups = new Set([...s.querySelectorAll<HTMLInputElement>('input[type=radio][required]')].map((i) => i.name));
    groups.forEach((g) => { const has = !!s.querySelector(`input[name="${g}"]:checked`); setErr(s.querySelector(`[data-error-for="${g}"]`), has ? null : t.choose); if (!has) { ok = false; first ??= s.querySelector<HTMLElement>(`input[name="${g}"]`); } });
    if (s.querySelector('input[name=slots]')) { const has = !!s.querySelector('input[name=slots]:checked'); setErr(s.querySelector('[data-error-for=slots]'), has ? null : t.slots); if (!has) { ok = false; first ??= s.querySelector<HTMLElement>('input[name=slots]'); } }
    s.querySelectorAll<HTMLInputElement>('input[required]:not([type=radio]):not([type=checkbox])').forEach((i) => {
      const v = i.value.trim(); let msg: string | null = null;
      if (i.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) msg = t.email;
      else if (i.type === 'tel' && v.replace(/[^\d+]/g, '').length < 9) msg = t.phone;
      else if (i.name === 'name' && v.length < 2) msg = t.name;
      setErr(i.parentElement?.querySelector('.field__error'), msg); i.toggleAttribute('aria-invalid', !!msg); if (msg) { ok = false; first ??= i; }
    });
    const consent = s.querySelector<HTMLInputElement>('input[name=consent][required]');
    if (consent) { setErr(s.querySelector('[data-error-for=consent]'), consent.checked ? null : t.consent); if (!consent.checked) { ok = false; first ??= consent; } }
    const files = s.querySelector<HTMLInputElement>('input[type=file]');
    if (files?.files?.length) { const bad = files.files.length > MAX_FILES || [...files.files].some((f) => f.size > MAX_MB * 1048576); setErr(files.parentElement?.querySelector('.field__error'), bad ? t.files : null); if (bad) { ok = false; first ??= files; } }
    first?.focus(); return ok;
  };

  function save() { const d: Record<string, unknown> = { step: cur }; new FormData(form).forEach((v, k) => { if (k !== 'files' && k !== 'website') { if (k === 'slots') (d.slots ||= [] as unknown[]) && (d.slots as unknown[]).push(v); else d[k] = v; } }); session.set(SKEY, JSON.stringify(d)); }
  function restore() {
    let d: Record<string, any> | null = null; try { d = JSON.parse(session.get(SKEY) || 'null'); } catch { d = null; } // eslint-disable-line
    const pre = JSON.parse(session.get('bylado-prefill') || 'null'); // from calculator / quiz result
    if (pre && kind === 'consult') { d = { ...(d || {}), ...pre }; session.del('bylado-prefill'); }
    const qt = new URLSearchParams(location.search).get('type'); if (qt && kind === 'consult') d = { ...(d || {}), type: qt };
    if (!d) return;
    Object.entries(d).forEach(([k, v]) => {
      if (k === 'step') return;
      if (k === 'slots' && Array.isArray(v)) { v.forEach((x) => { const c = form.querySelector<HTMLInputElement>(`input[name=slots][value="${x}"]`); if (c) c.checked = true; }); return; }
      const f = form.elements.namedItem(k); if (!f) return;
      if (f instanceof RadioNodeList) [...f].forEach((r) => ((r as HTMLInputElement).checked = (r as HTMLInputElement).value === v));
      else if ((f as HTMLInputElement).type === 'checkbox') (f as HTMLInputElement).checked = !!v;
      else (f as HTMLInputElement).value = String(v);
    });
    if (d.step) show(Number(d.step));
  }

  next.addEventListener('click', () => { if (!validate(cur)) return; track(quiz ? 'quiz_step' : 'form_step', { step: cur }); show(cur + 1); focusStep(); });
  back.addEventListener('click', () => { show(cur - 1, true); focusStep(); });
  let qStarted = !!form.closest('[data-quiz="overlay"]');
  form.addEventListener('change', (e) => { if (quiz && !qStarted) { qStarted = true; track('quiz_start', { location: location.pathname }); } save(); const tg = e.target as HTMLInputElement; if (quiz && tg.type === 'radio' && cur <= total - 2) setTimeout(() => next.click(), 260); });
  form.addEventListener('keydown', (e) => { if (e.key === 'Enter' && cur < total && (e.target as HTMLElement).tagName === 'INPUT') { e.preventDefault(); next.click(); } });
  let started = false; form.addEventListener('focusin', () => { if (!started && !quiz) { started = true; track('form_start', { kind }); } });

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); if (cur < total) { next.click(); return; } if (!validate(cur)) return;
    const fd = new FormData(form); const errEl = form.querySelector('[data-submit-error]');
    if (String(fd.get('website') || '')) { finish(true); return; }
    if (Date.now() - Number(session.get('bylado-last') || 0) < 30000) { setErr(errEl, t.fast); return; }
    const answers: QuizAnswers = quiz ? { goal: String(fd.get('goal')), hair: String(fd.get('hair')), current: String(fd.get('current')), length: String(fd.get('length')), life: String(fd.get('life')), before: String(fd.get('before')) } : {};
    const rec = quiz ? advise(answers) : [];
    const payload: Record<string, unknown> = {
      name: String(fd.get('name')).trim(), email: String(fd.get('email')).trim(), phone: String(fd.get('phone')).trim(), whatsapp_ok: fd.get('whatsapp_ok') === 'on',
      type: fd.get('type') || null, slots: fd.getAll('slots'), message: fd.get('message') || null,
      calc: fd.get('calc') ? JSON.parse(String(fd.get('calc'))) : null, quiz: quiz ? { answers, recommended: rec } : fd.get('quiz') ? JSON.parse(String(fd.get('quiz'))) : null,
      lang, page: location.pathname, utm: getUtm(),
    };
    submit.disabled = true; const prev = submit.textContent; submit.textContent = t.sending;
    try {
      const stored = await store(kind, payload, (form.elements.namedItem('files') as HTMLInputElement | null)?.files ?? null);
      if (!stored) console.info('[By Lado] Supabase not configured — lead not stored (dev/preview).', payload);
      track('generate_lead', { kind, type: payload.type, method: rec[0] });
      if (quiz) track('quiz_complete', { recommended: rec.join(',') });
      session.set('bylado-last', String(Date.now())); session.set('bylado-thanks-name', String(payload.name).split(' ')[0]); session.del(SKEY);
      if (quiz) { session.set('bylado-prefill', JSON.stringify({ type: 'consult', quiz: JSON.stringify({ answers, recommended: rec }), message: `Extension-check: ${rec.join(' / ')}` })); renderResult(form, rec, answers, lang); }
      else finish(stored);
    } catch { setErr(errEl, t.failed); submit.disabled = false; submit.textContent = prev; }
  });

  function finish(_ok: boolean) { location.href = form.dataset.thanks || (lang === 'nl' ? '/bedankt' : '/en/thank-you'); }
  restore();
}

function renderResult(form: HTMLFormElement, rec: MethodKey[], a: QuizAnswers, lang: 'nl' | 'en') {
  const host = form.closest<HTMLElement>('[data-quiz]')!; const box = host.querySelector<HTMLElement>('[data-quiz-result]')!;
  const methods = JSON.parse(host.dataset.methods || '[]') as { key: string; name: string; slug: string; short: string; idealFor: string; fromPrice: number | null }[];
  const picked = rec.map((k) => methods.find((m) => m.key === k)!).filter(Boolean);
  const nl = lang === 'nl';
  const why = (k: string) => {
    const r: string[] = [];
    if (a.hair === 'fijn' && (k === 'tape' || k === 'keratine')) r.push(nl ? 'past bij fijn haar omdat het gewicht over veel kleine plukjes wordt verdeeld' : 'suits fine hair because the weight is spread over many small sections');
    if (a.goal === 'volume' && k === 'weft') r.push(nl ? 'geeft veel volume in één rij' : 'gives lots of volume in one row');
    if (a.life === 'sport' && k === 'keratine') r.push(nl ? 'geeft veel bewegingsvrijheid' : 'gives lots of freedom of movement');
    if (a.life === 'weinig-tijd' && k === 'tape') r.push(nl ? 'ligt plat en is snel te stylen' : 'lies flat and is quick to style');
    if (k === 'clipin') r.push(nl ? 'doe je zelf in en uit, ideaal voor een event' : 'you put them in and take them out yourself — ideal for an event');
    return r.length ? r.join('; ') : (nl ? 'past bij jouw combinatie van haartype en wens' : 'matches your combination of hair type and goal');
  };
  box.querySelector('[data-result-title]')!.innerHTML = nl ? `Mijn eerste advies: <em>${picked.map((m) => m.name).join(' of ')}</em>` : `My first advice: <em>${picked.map((m) => m.name).join(' or ')}</em>`;
  box.querySelector('[data-result-methods]')!.innerHTML = picked.map((m) => `<article class="result-card"><h3>${m.name}</h3><p class="small">${m.short}</p><p class="small mt-1"><strong>${nl ? 'Waarom' : 'Why'}:</strong> ${why(m.key)}.</p>${nl ? `<a class="text-link mt-1" href="${m.slug}">Alles over ${m.name.toLowerCase()} <span class="arrow" aria-hidden="true">→</span></a>` : ''}</article>`).join('');
  const prices = picked.map((m) => m.fromPrice).filter((p): p is number => typeof p === 'number');
  box.querySelector('[data-result-price]')!.innerHTML = prices.length ? `${nl ? 'vanaf' : 'from'} €${Math.min(...prices)}` : '<span class="ph">[PRIJSRANGE VOLGT]</span>';
  const wa = box.querySelector<HTMLAnchorElement>('[data-result-wa]');
  const waNum = document.querySelector<HTMLAnchorElement>('a[href^="https://wa.me/"]')?.href.match(/wa\.me\/(\d+)/)?.[1];
  if (wa && waNum) wa.href = `https://wa.me/${waNum}?text=${encodeURIComponent(`Hoi Quinty! Ik deed de extension-check en kreeg als advies: ${picked.map((m) => m.name).join(' / ')}. Hierbij een foto van mijn haar.`)}`;
  form.hidden = true; box.hidden = false; box.focus();
}
