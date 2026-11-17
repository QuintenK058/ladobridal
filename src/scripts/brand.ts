/* By Lado signature interactions: strand line, length reveal, swatches, hair video, before/after extras, results filters, guide offer. */
import { track, session } from './track';
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $$ = <T extends HTMLElement = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];

export function initBrand() {
  /* Flowing strand: draw along scroll (desktop) */
  const strands = $$<SVGSVGElement & HTMLElement>('[data-strand]');
  strands.forEach((svg) => { const p = svg.querySelector('path') as SVGPathElement; const len = Math.ceil(p.getTotalLength()); svg.style.setProperty('--len', String(len)); });
  /* Length reveal */
  const lr = document.querySelector<HTMLElement>('[data-length-reveal]');
  const marks = lr ? $$('li[data-at]', lr) : [];
  const onScroll = () => {
    const vh = innerHeight;
    strands.forEach((svg) => { const r = svg.parentElement!.getBoundingClientRect(); const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.3))); svg.style.setProperty('--draw', reduced ? '1' : p.toFixed(3)); });
    if (lr) {
      const r = lr.getBoundingClientRect(); const desk = innerWidth >= 900;
      const p = desk ? Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - vh))) : Math.min(1, Math.max(0, (vh - r.top) / (r.height + vh * 0.2)));
      const reveal = reduced ? 1 : 0.25 + p * 0.75;
      lr.style.setProperty('--reveal', reveal.toFixed(3));
      marks.forEach((m) => m.classList.toggle('is-on', reveal >= Number(m.dataset.at)));
    }
  };
  if (strands.length || lr) { addEventListener('scroll', () => requestAnimationFrame(onScroll), { passive: true }); onScroll(); }

  /* Colour swatches */
  $$('[data-swatches]').forEach((g) => {
    const stage = document.querySelector<HTMLElement>(g.dataset.swatches!); const name = document.querySelector<HTMLElement>(g.dataset.name!);
    $$('button.swatch', g).forEach((b) => b.addEventListener('click', () => {
      $$('button.swatch', g).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      stage?.style.setProperty('--sw', b.dataset.color!); if (name) name.textContent = b.dataset.label!;
    }));
  });

  /* Hair videos: attach source lazily, pause off-screen, never with reduced motion */
  if (!reduced) {
    const vio = new IntersectionObserver((es) => es.forEach((e) => {
      const host = e.target as HTMLElement; let v = host.querySelector('video');
      if (e.isIntersecting && !v && host.dataset.hairVideo) { v = document.createElement('video'); Object.assign(v, { muted: true, loop: true, playsInline: true, autoplay: true }); v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.src = host.dataset.hairVideo; v.setAttribute('aria-hidden', 'true'); host.appendChild(v); }
      if (v) e.isIntersecting ? v.play().catch(() => {}) : v.pause();
    }), { threshold: 0.2 });
    $$('[data-hair-video]').forEach((h) => vio.observe(h));
  }

  /* Before/after: tap toggle + thumbnails + interaction tracking */
  $$('[data-ba]').forEach((ba) => {
    const r = ba.querySelector<HTMLInputElement>('input[type=range]')!; let tracked = false;
    const mark = () => { if (!tracked) { tracked = true; track('before_after_interaction', { page: location.pathname }); } };
    r.addEventListener('input', mark);
    ba.querySelector('[data-ba-toggle]')?.addEventListener('click', () => { r.value = Number(r.value) > 50 ? '0' : '100'; r.dispatchEvent(new Event('input')); });
  });
  $$('[data-ba-thumbs]').forEach((g) => {
    const target = document.querySelector<HTMLElement>(g.dataset.baThumbs!);
    $$('button', g).forEach((b) => b.addEventListener('click', () => {
      $$('button', g).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      const cap = target?.closest('figure')?.querySelector('[data-ba-caption]'); if (cap) cap.textContent = b.dataset.caption!;
      target?.querySelectorAll('.ph-img__label').forEach((l, i) => (l.textContent = `Foto · ${i ? 'na' : 'voor'} · ${b.dataset.caption}`));
      const r = target?.querySelector<HTMLInputElement>('input[type=range]'); if (r) { r.value = '50'; r.dispatchEvent(new Event('input')); }
      track('before_after_interaction', { item: b.dataset.caption });
    }));
  });
  /* Hero thumbnail opens the full slider section */
  document.querySelector('[data-open-ba]')?.addEventListener('click', () => { const t = document.querySelector<HTMLElement>('#resultaten'); t?.scrollIntoView({ behavior: 'smooth' }); setTimeout(() => t?.querySelector<HTMLInputElement>('input[type=range]')?.focus({ preventScroll: true }), 700); });

  /* Results filters (multi-group, AND) */
  const grid = document.querySelector<HTMLElement>('[data-results]');
  if (grid) {
    const state: Record<string, string> = {};
    $$('[data-filter-group]').forEach((grp) => $$('button[data-v]', grp).forEach((b) => b.addEventListener('click', () => {
      $$('button[data-v]', grp).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      state[grp.dataset.filterGroup!] = b.dataset.v!;
      const apply = () => { let n = 0; $$('.result', grid).forEach((it) => { const ok = Object.entries(state).every(([k, v]) => v === 'all' || it.dataset[k] === v); it.classList.toggle('is-hidden', !ok); if (ok) n++; }); const c = document.querySelector('[data-results-count]'); if (c) c.textContent = String(n); };
      // @ts-ignore
      document.startViewTransition && !reduced ? document.startViewTransition(apply) : apply();
      track('results_filter', { [grp.dataset.filterGroup!]: b.dataset.v });
    })));
  }

  /* Guide offer: exit intent (desktop) / 45 s (mobile), once per visitor, easy to close */
  const offer = document.querySelector<HTMLElement>('[data-offer]');
  let seen = false; try { seen = !!localStorage.getItem('bylado-offer'); } catch { /* */ }
  if (offer && !seen && !location.pathname.match(/consult|bedankt|extension-check|contact/)) {
    const show = () => { if (seen || document.documentElement.classList.contains('quiz-open')) return; seen = true; offer.hidden = false; offer.classList.add('is-open'); try { localStorage.setItem('bylado-offer', '1'); } catch { /* */ } };
    if (matchMedia('(hover: hover) and (pointer: fine)').matches) document.addEventListener('mouseout', (e) => { if (!e.relatedTarget && e.clientY < 10) show(); });
    else setTimeout(show, 45000);
    offer.querySelector('[data-offer-close]')?.addEventListener('click', () => { offer.classList.remove('is-open'); offer.hidden = true; });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && offer.classList.contains('is-open')) { offer.classList.remove('is-open'); offer.hidden = true; } });
  }
  $$<HTMLFormElement>('form[data-guide-form]').forEach((f) => f.addEventListener('submit', async (e) => {
    e.preventDefault(); const email = (f.elements.namedItem('email') as HTMLInputElement); const err = email.parentElement!.querySelector('.field__error') as HTMLElement;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) { err.textContent = 'Vul een geldig e-mailadres in.'; err.hidden = false; email.focus(); return; }
    err.hidden = true; if ((f.elements.namedItem('website') as HTMLInputElement)?.value) return;
    const U = import.meta.env.PUBLIC_SUPABASE_URL, K = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
    if (U && K) await fetch(`${U}/rest/v1/leads`, { method: 'POST', headers: { apikey: K, Authorization: `Bearer ${K}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' }, body: JSON.stringify({ kind: 'guide', email: email.value.trim(), page: location.pathname }) }).catch(() => {});
    track('guide_download', { page: location.pathname });
    (f.querySelector('[data-guide-done]') as HTMLElement).hidden = false; (f.querySelector('button[type=submit]') as HTMLElement).hidden = true;
  }));

  const n = document.querySelector('[data-thanks-name]'); if (n) { const v = session.get('bylado-thanks-name'); if (v) n.textContent = `, ${v}`; }
}
