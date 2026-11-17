import { track, session } from './track';
const fmt = (n: number) => new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', minimumFractionDigits: n % 1 ? 2 : 0 }).format(n);
export function initCalculator() {
  const calc = document.querySelector<HTMLElement>('[data-calc]'); if (!calc) return;
  const cfg = JSON.parse(calc.dataset.calc!); const maint = cfg.maintenancePrice as number | null;
  const out = { total: calc.querySelector<HTMLElement>('[data-total]')!, year: calc.querySelector<HTMLElement>('[data-year]')!, lines: calc.querySelector<HTMLElement>('[data-lines]')!, note: calc.querySelector<HTMLElement>('[data-missing]')! };
  const get = (n: string) => (calc.querySelector<HTMLInputElement>(`[name=${n}]:checked`) || calc.querySelector<HTMLInputElement>(`[name=${n}]`))!;
  let used = false;
  const state = () => {
    const m = get('method').value, mName = get('method').dataset.label!, len = Number(get('length').value), goal = get('goal').value as 'volume' | 'lengte' | 'beide', mix = get('colour').value === 'mix', withMaint = get('maint').checked;
    const base = cfg.base[m]?.[len] ?? null; const factor = cfg.amountFactor[goal]; const placement = base !== null && factor !== null ? base * factor : null;
    const lines: [string, number | null][] = [[`${mName} · ${len} cm · ${goal}`, placement]];
    if (mix) lines.push(['Kleuren mixen', cfg.colourMix]);
    const visits = cfg.maintenanceVisitsPerYear[m]; const yearly = withMaint ? [visits !== null && maint !== null ? visits * maint : null, cfg.newHairPerYear[m]] : [];
    const once = lines.reduce<number | null>((s, [, v]) => (s === null || v === null ? null : s + v), 0);
    const year = withMaint && once !== null && yearly.every((v) => v !== null) ? once + (yearly as number[]).reduce((a, b) => a + b, 0) : null;
    if (withMaint) { lines.push([`Onderhoud per jaar (${visits ?? '?'}× )`, yearly[0]]); lines.push(['Nieuw haar per jaar', yearly[1]]); }
    return { m, mName, len, goal, mix, withMaint, lines, once, year };
  };
  const update = () => {
    const s = state();
    out.lines.innerHTML = s.lines.map(([l, v]) => `<li><span>${l}</span><span>${v === null ? 'prijs volgt' : fmt(v)}</span></li>`).join('');
    out.total.textContent = s.once === null ? '—' : fmt(s.once);
    out.year.textContent = s.withMaint ? (s.year === null ? '—' : fmt(s.year)) : 'zet onderhoud aan';
    out.note.hidden = s.once !== null && (!s.withMaint || s.year !== null);
  };
  calc.addEventListener('change', () => { update(); if (!used) { used = true; track('calculator_used'); } });
  calc.querySelector('[data-calc-cta]')?.addEventListener('click', () => {
    const s = state(); track('calculator_to_consult', { method: s.m, length: s.len });
    session.set('bylado-prefill', JSON.stringify({ type: 'consult', calc: JSON.stringify(s), message: `Prijscalculator: ${s.mName}, ${s.len} cm, ${s.goal}${s.mix ? ', kleuren mixen' : ''}${s.withMaint ? ', incl. onderhoud' : ''}` }));
    location.href = '/consult';
  });
  update();
}
