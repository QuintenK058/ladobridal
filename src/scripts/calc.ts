import { track } from './track';

const fmt = (n: number) => new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }).format(n);

export function initCalculator() {
  const calc = document.querySelector<HTMLElement>('[data-calc]');
  if (!calc) return;
  const cfg = JSON.parse(calc.dataset.calc!) as { perKm: number; overnightFromKm: number; guest: number; mother: number; lashes: number; touchUp: number };
  const out = { total: calc.querySelector<HTMLElement>('[data-total]')!, lines: calc.querySelector<HTMLElement>('[data-lines]')!, note: calc.querySelector<HTMLElement>('[data-km-note]')!, pkgNote: calc.querySelector<HTMLElement>('[data-pkg-note]')! };
  const km = calc.querySelector<HTMLInputElement>('[name=km]')!;
  const kmOut = calc.querySelector<HTMLElement>('[data-km-out]')!;
  const place = calc.querySelector<HTMLSelectElement>('[name=place]')!;
  const kmWrap = calc.querySelector<HTMLElement>('[data-km-wrap]')!;
  let used = false, shown = 0;

  calc.querySelectorAll<HTMLElement>('[data-stepper]').forEach((s) => {
    const o = s.querySelector('output')!; const min = Number(s.dataset.min || 0), max = Number(s.dataset.max || 8);
    s.querySelectorAll<HTMLButtonElement>('button').forEach((b) => b.addEventListener('click', () => {
      const v = Math.min(max, Math.max(min, Number(o.value || o.textContent) + Number(b.dataset.delta)));
      o.value = String(v); o.textContent = String(v); update();
    }));
  });
  place.addEventListener('change', () => { if (place.value) { km.value = place.value; } update(); });
  km.addEventListener('input', () => { place.value = ''; update(); });
  calc.addEventListener('change', update);

  function val(name: string) { const o = calc!.querySelector<HTMLOutputElement>(`[data-stepper=${name}] output`); return Number(o?.value || o?.textContent || 0); }

  function state() {
    const pkg = calc!.querySelector<HTMLInputElement>('[name=pkg]:checked')!;
    const price = pkg.dataset.price ? Number(pkg.dataset.price) : null;
    const isDest = pkg.value === 'destination';
    const guests = val('guests'), lashes = val('lashes'), touch = val('touchup');
    const mother = (calc!.querySelector<HTMLInputElement>('[name=mother]')!).checked;
    const oneWay = isDest ? 0 : Number(km.value);
    const travel = Math.round(oneWay * 2 * cfg.perKm * 100) / 100;
    const lines: [string, number | null][] = [[pkg.dataset.label!, price]];
    if (guests) lines.push([`${guests}× bruidsmeisje/gast`, guests * cfg.guest]);
    if (mother) lines.push(['Moeder van de bruid', cfg.mother]);
    if (lashes) lines.push([`${lashes}× extra set wimpers`, lashes * cfg.lashes]);
    if (touch) lines.push([`${touch} uur touch-up`, touch * cfg.touchUp]);
    if (!isDest) lines.push([`Reiskosten (${oneWay} km × 2 × ${fmt(cfg.perKm)})`, travel]);
    const total = lines.reduce((s, [, v]) => s + (v ?? 0), 0);
    return { pkg: pkg.value, label: pkg.dataset.label!, price, isDest, guests, lashes, touch, mother, oneWay, travel, lines, total };
  }

  function animateTo(target: number) {
    const from = shown; const start = performance.now(); const dur = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 500;
    const step = (now: number) => { const p = dur ? Math.min(1, (now - start) / dur) : 1; const v = from + (target - from) * (1 - Math.pow(1 - p, 3)); out.total.textContent = fmt(Math.round(v * 100) / 100); if (p < 1) requestAnimationFrame(step); else shown = target; };
    requestAnimationFrame(step);
  }

  function update() {
    const s = state();
    kmOut.textContent = `${s.oneWay} km`;
    kmWrap.hidden = s.isDest;
    out.lines.innerHTML = s.lines.map(([l, v]) => `<li><span>${l}</span><span>${v === null ? 'prijs volgt' : fmt(v)}</span></li>`).join('');
    out.note.hidden = !(s.oneWay > cfg.overnightFromKm) || s.isDest;
    out.pkgNote.hidden = s.price !== null;
    out.pkgNote.textContent = s.isDest ? 'Destination weddings krijgen altijd een offerte op maat: styling, reistijd, vluchten en verblijf staan los vermeld.' : 'Voor dit pakket staat de vanaf-prijs nog niet online; je ziet hier alleen de extra’s en reiskosten.';
    animateTo(s.total);
    if (used) return; used = true; // first interaction only
  }

  let tracked = false;
  calc.addEventListener('input', () => { if (!tracked) { tracked = true; track('calculator_used'); } });
  calc.addEventListener('click', (e) => { if ((e.target as HTMLElement).closest('button') && !tracked) { tracked = true; track('calculator_used'); } });

  calc.querySelector('[data-calc-cta]')?.addEventListener('click', () => {
    const s = state();
    const serviceMap: Record<string, string> = { complete: 'complete', kapsel: 'kapsel', visagie: 'visagie', destination: 'destination' };
    const persons = s.guests === 0 ? '0' : s.guests <= 2 ? '1–2' : s.guests <= 5 ? '3–5' : '6+';
    const summary = `Configuratie uit de prijscalculator:\n${s.lines.map(([l, v]) => `- ${l}: ${v === null ? 'prijs volgt' : fmt(v)}`).join('\n')}\nIndicatie: ${fmt(s.total)}`;
    track('calculator_to_form', { package: s.pkg, total: s.total });
    document.dispatchEvent(new CustomEvent('lado:prefill', { detail: { service: serviceMap[s.pkg], persons, mother: s.mother ? 'ja' : 'nee', message: summary, calc: JSON.stringify(s) } }));
  });
  update();
}
