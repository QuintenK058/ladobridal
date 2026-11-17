import { initConsent, captureUtm, track, session } from './track';
import { initLeadForms } from './form';
import { initCalculator } from './calc';

const root = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
const desktop = () => innerWidth >= 900;
const $$ = <T extends HTMLElement = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];

/* ---------- Split text into words (keeps inline markup like <em>) ---------- */
function splitWords(el: HTMLElement) {
  let wi = 0; let lastInner: HTMLElement | null = null;
  const walk = (node: Node) => {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const parts = (n.textContent || '').split(/(\s+)/);
        const frag = document.createDocumentFragment();
        parts.forEach((p, pi) => {
          if (!p) return;
          // punctuation glued to the previous word (e.g. after </em>) must not wrap on its own
          if (pi === 0 && lastInner && /^[,.;:!?)…]+$/.test(p)) { lastInner.textContent += p; return; }
          if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(' ')); return; }
          const w = document.createElement('span'); w.className = 'word';
          const i = document.createElement('span'); i.textContent = p; i.style.setProperty('--wi', String(wi++));
          w.appendChild(i); frag.appendChild(w); lastInner = i;
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1 && (n as HTMLElement).tagName !== 'BR') walk(n);
    });
  };
  walk(el);
  // line index for staggered line reveal
  let top = -1, li = -1;
  $$('.word', el).forEach((w) => { if (Math.abs(w.offsetTop - top) > 4) { top = w.offsetTop; li++; } (w.firstElementChild as HTMLElement).style.setProperty('--li', String(li)); });
}
$$('[data-split]').forEach((el) => { splitWords(el); if (!el.classList.contains('hero-words')) el.classList.add('reveal-text'); });

/* ---------- Reveal on scroll ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
$$('.reveal, .reveal-img, .reveal-text, .signature, [data-count]').forEach((el) => io.observe(el));
// Safety: anything above the fold or missed is shown after load
addEventListener('load', () => setTimeout(() => $$('.reveal, .reveal-img, .reveal-text').forEach((el) => { const r = el.getBoundingClientRect(); if (r.top < innerHeight) el.classList.add('in'); }), 100));

/* ---------- CountUp ---------- */
const countIO = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const el = e.target as HTMLElement; countIO.unobserve(el);
    const to = Number(el.dataset.count); const dec = Number(el.dataset.decimals || 0); const suffix = el.dataset.suffix || '';
    if (reduced) { el.textContent = to.toFixed(dec).replace('.', el.dataset.sep || '.') + suffix; return; }
    const start = performance.now(), dur = 1600;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur); const v = to * (1 - Math.pow(1 - p, 4));
      el.textContent = v.toFixed(dec).replace('.', el.dataset.sep || '.') + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}, { threshold: 0.5 });
$$('[data-count]').forEach((el) => countIO.observe(el));

/* ---------- Header ---------- */
const header = document.querySelector<HTMLElement>('[data-header]');
const mobileBar = document.querySelector<HTMLElement>('[data-mobile-bar]');
const footer = document.querySelector('[data-footer]');
const hero = document.querySelector('[data-hero]');
let footerVisible = false, formVisible = false, heroGone = !hero;
new IntersectionObserver(([e]) => { footerVisible = e.isIntersecting; syncBar(); }).observe(footer!);
const inlineForms = $$('.lead-form').filter((f) => !f.closest('[data-drawer]'));
if (inlineForms.length) new IntersectionObserver((es) => { formVisible = es.some((e) => e.isIntersecting); syncBar(); }).observe(inlineForms[0]);
$$('[data-calc]').forEach((c) => new IntersectionObserver(([e]) => { formVisible = e.isIntersecting; syncBar(); }).observe(c));
function syncBar() {
  if (!mobileBar) return;
  const focusInField = document.activeElement?.matches('input, select, textarea') ?? false;
  mobileBar.classList.toggle('is-visible', heroGone && !root.classList.contains('drawer-open') && !footerVisible && !formVisible && !focusInField && root.classList.contains('consent-done'));
}
document.addEventListener('focusin', syncBar); document.addEventListener('focusout', () => setTimeout(syncBar, 50));
const onScroll = () => {
  const y = scrollY;
  header?.classList.toggle('is-scrolled', y > 24);
  heroGone = hero ? y > (hero as HTMLElement).offsetHeight * 0.6 : y > 300;
  syncBar();
};
addEventListener('scroll', onScroll, { passive: true }); onScroll();
new MutationObserver(syncBar).observe(root, { attributes: true, attributeFilter: ['class'] });

/* Mega menu */
const megaBtn = document.querySelector<HTMLButtonElement>('[data-mega-toggle]');
const mega = document.querySelector<HTMLElement>('[data-mega]');
if (megaBtn && mega) {
  let closeT: number | undefined;
  const set = (open: boolean) => { mega.classList.toggle('is-open', open); megaBtn.setAttribute('aria-expanded', String(open)); header?.classList.toggle('is-solid', open); };
  megaBtn.addEventListener('click', () => set(megaBtn.getAttribute('aria-expanded') !== 'true'));
  if (fine) {
    [megaBtn, mega].forEach((el) => {
      el.addEventListener('mouseenter', () => { clearTimeout(closeT); set(true); });
      el.addEventListener('mouseleave', () => { closeT = window.setTimeout(() => set(false), 220); });
    });
  }
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && mega.classList.contains('is-open')) { set(false); megaBtn.focus(); } });
  // Keyboard: Tab from the open toggle goes into the panel; Tab out of the panel continues with the next nav link.
  const megaLinks = () => [...mega.querySelectorAll<HTMLElement>('a')];
  megaBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && !e.shiftKey && megaBtn.getAttribute('aria-expanded') === 'true') { e.preventDefault(); megaLinks()[0]?.focus(); }
  });
  mega.addEventListener('keydown', (e) => {
    const links = megaLinks();
    if (e.key !== 'Tab') return;
    if (!e.shiftKey && document.activeElement === links[links.length - 1]) {
      e.preventDefault(); set(false);
      (megaBtn.closest('li')?.nextElementSibling?.querySelector('a') as HTMLElement | null)?.focus();
    } else if (e.shiftKey && document.activeElement === links[0]) { e.preventDefault(); megaBtn.focus(); }
  });
  mega.addEventListener('focusout', (e) => { if (!mega.contains(e.relatedTarget as Node) && e.relatedTarget !== megaBtn) set(false); });
}

/* Mobile menu */
const menu = document.querySelector<HTMLElement>('[data-mobile-menu]');
const menuOpen = document.querySelector<HTMLButtonElement>('[data-menu-open]');
const closeMenu = () => {
  if (!menu?.classList.contains('is-open')) return;
  menu.classList.remove('is-open'); menuOpen?.setAttribute('aria-expanded', 'false'); document.body.style.overflow = '';
  setTimeout(() => (menu.hidden = true), 500); menuOpen?.focus();
};
menuOpen?.addEventListener('click', () => {
  if (!menu) return;
  menu.hidden = false; requestAnimationFrame(() => menu.classList.add('is-open'));
  menuOpen.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden';
  setTimeout(() => menu.querySelector<HTMLElement>('[data-menu-close]')?.focus(), 50);
});
menu?.querySelector('[data-menu-close]')?.addEventListener('click', closeMenu);
menu?.addEventListener('click', (e) => { if ((e.target as HTMLElement).closest('a')) closeMenu(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
document.addEventListener('lado:menu-close', closeMenu);

/* ---------- FAQ ---------- */
$$('[data-faq] .faq__q').forEach((btn) => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq__item')!; const open = btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', String(open)); item.classList.toggle('is-open', open);
  });
});

/* ---------- Quote carousel (no autoplay) ---------- */
$$('[data-carousel]').forEach((c) => {
  const slides = $$('.quote-slide', c); const count = c.querySelector('[data-count]'); let i = 0;
  const go = (n: number) => { slides[i].classList.remove('is-active'); i = (n + slides.length) % slides.length; slides[i].classList.add('is-active'); if (count) count.textContent = `${i + 1} / ${slides.length}`; };
  c.querySelector('[data-prev]')?.addEventListener('click', () => go(i - 1));
  c.querySelector('[data-next]')?.addEventListener('click', () => go(i + 1));
  let x0: number | null = null;
  c.addEventListener('touchstart', (e) => (x0 = e.touches[0].clientX), { passive: true });
  c.addEventListener('touchend', (e) => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1)); x0 = null; });
  c.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') go(i - 1); if (e.key === 'ArrowRight') go(i + 1); });
});

/* ---------- Before / after ---------- */
$$('[data-ba]').forEach((ba) => {
  const r = ba.querySelector<HTMLInputElement>('input[type=range]')!;
  const set = () => ba.style.setProperty('--pos', `${r.value}%`);
  r.addEventListener('input', set); set();
});

/* ---------- Scroll-linked: timeline, parallax, pinned gallery ---------- */
const timelines = $$('[data-timeline]');
const parallax = reduced ? [] : $$('[data-parallax]');
const pinned = $$('[data-hgallery]');
function setupPins() {
  pinned.forEach((g) => {
    const track = g.querySelector<HTMLElement>('.h-gallery__track')!;
    const on = desktop() && !reduced;
    g.classList.toggle('is-pinned', on);
    if (on) { const dist = track.scrollWidth - innerWidth; g.style.setProperty('--pin-h', `${innerHeight + Math.max(0, dist)}px`); g.dataset.dist = String(Math.max(0, dist)); }
    else { g.style.removeProperty('--pin-h'); track.style.transform = ''; }
  });
}
setupPins(); addEventListener('resize', setupPins);
let ticking = false;
function frame() {
  ticking = false;
  const vh = innerHeight;
  timelines.forEach((t) => { const r = t.getBoundingClientRect(); const p = Math.min(1, Math.max(0, (vh * 0.75 - r.top) / (r.height || 1))); t.style.setProperty('--progress', reduced ? '1' : p.toFixed(3)); });
  if (desktop()) parallax.forEach((el) => {
    const r = el.getBoundingClientRect(); if (r.bottom < -200 || r.top > vh + 200) return;
    const speed = Number(el.dataset.parallax || 0.1); const c = r.top + r.height / 2 - vh / 2;
    el.style.transform = `translate3d(0, ${(-c * speed).toFixed(1)}px, 0)`;
  });
  pinned.forEach((g) => {
    if (!g.classList.contains('is-pinned')) return;
    const r = g.getBoundingClientRect(); const total = g.offsetHeight - vh; const p = Math.min(1, Math.max(0, -r.top / (total || 1)));
    g.querySelector<HTMLElement>('.h-gallery__track')!.style.transform = `translate3d(${-p * Number(g.dataset.dist || 0)}px,0,0)`;
  });
}
const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
if (timelines.length || parallax.length || pinned.length) { addEventListener('scroll', req, { passive: true }); addEventListener('resize', req); frame(); }

/* ---------- Region list: hover image preview (desktop) ---------- */
const preview = document.querySelector<HTMLElement>('[data-hover-preview]');
if (fine && preview && !reduced) {
  $$('[data-preview]').forEach((a) => {
    a.addEventListener('mouseenter', () => { preview.innerHTML = `<div class="media ratio-4x5"><div class="ph-img"><span class="ph-img__label">Foto · ${a.dataset.preview}</span></div></div>`; preview.classList.add('is-visible'); });
    a.addEventListener('mouseleave', () => preview.classList.remove('is-visible'));
    a.addEventListener('mousemove', (e) => { preview.style.transform = `translate3d(${e.clientX + 24}px, ${e.clientY - 150}px, 0)`; });
  });
}

/* ---------- Desktop-only enhancements: Lenis, cursor, magnetic buttons, preloader ---------- */
if (fine && !reduced && desktop()) {
  import('lenis').then(({ default: Lenis }) => {
    const lenis = new Lenis({ duration: 1.1, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
    (window as any).__lenis = lenis; // eslint-disable-line
    const raf = (t: number) => { lenis.raf(t); requestAnimationFrame(raf); }; requestAnimationFrame(raf);
    $$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => { const id = a.getAttribute('href')!; if (id.length > 1 && document.querySelector(id)) { e.preventDefault(); lenis.scrollTo(id, { offset: -80 }); } }));
  });

  const cursor = document.querySelector<HTMLElement>('[data-cursor]');
  if (cursor) {
    root.classList.add('has-cursor');
    let x = 0, y = 0, cx = 0, cy = 0;
    addEventListener('mousemove', (e) => { x = e.clientX; y = e.clientY; cursor.classList.add('is-active'); }, { passive: true });
    document.addEventListener('mouseleave', () => cursor.classList.remove('is-active'));
    const loop = () => { cx += (x - cx) * 0.22; cy += (y - cy) * 0.22; cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`; requestAnimationFrame(loop); }; loop();
    document.addEventListener('mouseover', (e) => {
      const t = e.target as HTMLElement;
      cursor.classList.toggle('is-view', !!t.closest('[data-cursor-view], .masonry__btn, .h-gallery__item'));
      cursor.classList.toggle('is-link', !cursor.classList.contains('is-view') && !!t.closest('a, button, label, input, select, textarea'));
    });
  }

  $$('.btn').forEach((b) => {
    b.addEventListener('mousemove', (e) => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${((e.clientX - r.left - r.width / 2) * 0.15).toFixed(1)}px, ${((e.clientY - r.top - r.height / 2) * 0.25).toFixed(1)}px)`; });
    b.addEventListener('mouseleave', () => (b.style.transform = ''));
  });

  const pre = document.querySelector<HTMLElement>('[data-preloader]');
  if (pre && !session.get('lado-seen')) { pre.hidden = false; setTimeout(() => pre.remove(), 1700); }
  session.set('lado-seen', '1');
}

/* ---------- Portfolio: filters + lightbox ---------- */
const masonry = document.querySelector<HTMLElement>('[data-masonry]');
if (masonry) {
  const items = $$('.masonry__item', masonry);
  $$('[data-filter]').forEach((chip) => chip.addEventListener('click', () => {
    const f = chip.dataset.filter!;
    $$('[data-filter]').forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
    const apply = () => items.forEach((it) => it.classList.toggle('is-hidden', f !== 'all' && !(it.dataset.cat || '').split(' ').includes(f)));
    // @ts-ignore View Transitions API where available
    if (document.startViewTransition && !reduced) document.startViewTransition(apply); else apply();
  }));
  const lb = document.querySelector<HTMLElement>('[data-lightbox]');
  if (lb) {
    const stage = lb.querySelector<HTMLElement>('[data-lb-stage]')!; const cap = lb.querySelector<HTMLElement>('[data-lb-cap]')!; const cnt = lb.querySelector<HTMLElement>('[data-lb-count]')!;
    let idx = 0, opener: HTMLElement | null = null;
    const visible = () => items.filter((i) => !i.classList.contains('is-hidden'));
    const render = () => { const v = visible(); const it = v[idx]; stage.innerHTML = it.querySelector('.media')!.outerHTML; cap.textContent = it.dataset.caption || ''; cnt.textContent = `${idx + 1} / ${v.length}`; stage.querySelector('.media')?.classList.remove('reveal-img'); };
    const open = (it: HTMLElement) => { opener = it.querySelector('button'); idx = visible().indexOf(it); render(); lb.classList.add('is-open'); lb.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; lb.querySelector<HTMLElement>('[data-lb-close]')!.focus(); track('portfolio_lightbox_open', { item: it.dataset.caption }); };
    const close = () => { lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; opener?.focus(); };
    const step = (d: number) => { const n = visible().length; idx = (idx + d + n) % n; render(); };
    items.forEach((it) => it.querySelector('button')?.addEventListener('click', () => open(it)));
    lb.querySelector('[data-lb-close]')?.addEventListener('click', close);
    lb.querySelector('[data-lb-prev]')?.addEventListener('click', () => step(-1));
    lb.querySelector('[data-lb-next]')?.addEventListener('click', () => step(1));
    lb.querySelector('[data-open-form]')?.addEventListener('click', close);
    document.addEventListener('keydown', (e) => { if (!lb.classList.contains('is-open')) return; if (e.key === 'Escape') close(); if (e.key === 'ArrowLeft') step(-1); if (e.key === 'ArrowRight') step(1); });
    let x0: number | null = null;
    lb.addEventListener('touchstart', (e) => (x0 = e.touches[0].clientX), { passive: true });
    lb.addEventListener('touchend', (e) => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1); x0 = null; });
  }
}

/* ---------- Thank-you personalisation ---------- */
const thanksName = document.querySelector('[data-thanks-name]');
if (thanksName) { const n = session.get('lado-thanks-name'); if (n) thanksName.textContent = `, ${n}`; }

captureUtm();
initConsent();
initLeadForms();
initCalculator();
