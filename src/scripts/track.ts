/* Consent (Consent Mode v2) + GA4 + Meta Pixel. Nothing loads before consent. */
declare global {
  interface Window { dataLayer: unknown[]; gtag: (...a: unknown[]) => void; fbq?: ((...a: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown; callMethod?: (...a: unknown[]) => void }; _fbq?: unknown; }
}

const GA4 = import.meta.env.PUBLIC_GA4_ID as string | undefined;
const PIXEL = import.meta.env.PUBLIC_META_PIXEL_ID as string | undefined;
const TIKTOK = import.meta.env.PUBLIC_TIKTOK_PIXEL_ID as string | undefined;
let ttLoaded = false;
const KEY = 'bylado-consent-v1';

type Consent = { analytics: boolean; marketing: boolean; ts: number };

const store = {
  get(k: string): string | null { try { return localStorage.getItem(k); } catch { return null; } },
  set(k: string, v: string) { try { localStorage.setItem(k, v); } catch { /* private mode */ } },
};
export const session = {
  get(k: string): string | null { try { return sessionStorage.getItem(k); } catch { return null; } },
  set(k: string, v: string) { try { sessionStorage.setItem(k, v); } catch { /* ignore */ } },
  del(k: string) { try { sessionStorage.removeItem(k); } catch { /* ignore */ } },
};

let consent: Consent | null = null;
try { consent = JSON.parse(store.get(KEY) || 'null'); } catch { consent = null; }

function loadScript(src: string) {
  const s = document.createElement('script'); s.async = true; s.src = src; document.head.appendChild(s);
}

let gaLoaded = false, pixelLoaded = false;
function applyConsent(c: Consent) {
  window.gtag('consent', 'update', {
    analytics_storage: c.analytics ? 'granted' : 'denied',
    ad_storage: c.marketing ? 'granted' : 'denied',
    ad_user_data: c.marketing ? 'granted' : 'denied',
    ad_personalization: c.marketing ? 'granted' : 'denied',
  });
  if (c.analytics && GA4 && !gaLoaded) {
    gaLoaded = true;
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA4}`);
    window.gtag('js', new Date());
    window.gtag('config', GA4, { anonymize_ip: true });
  }
  if (c.marketing && PIXEL && !pixelLoaded) {
    pixelLoaded = true;
    /* Meta Pixel base code (inlined, consent-gated) */
    const f = window as any; // eslint-disable-line
    if (!f.fbq) {
      const n: any = (f.fbq = function (...args: unknown[]) { n.callMethod ? n.callMethod(...args) : n.queue.push(args); }); // eslint-disable-line
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
      loadScript('https://connect.facebook.net/en_US/fbevents.js');
    }
    window.fbq!('init', PIXEL);
    window.fbq!('track', 'PageView');
  }
  if (c.marketing && TIKTOK && !ttLoaded) {
    ttLoaded = true;
    const w = window as any; // eslint-disable-line
    w.ttq = w.ttq || []; ['page', 'track', 'identify'].forEach((m) => (w.ttq[m] = w.ttq[m] || ((...a: unknown[]) => w.ttq.push([m, ...a]))));
    loadScript(`https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=${TIKTOK}&lib=ttq`);
    w.ttq.page();
  }
}

export function track(event: string, params: Record<string, unknown> = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
  if (gaLoaded) window.gtag('event', event, params);
  if (pixelLoaded && window.fbq) {
    if (event === 'generate_lead') window.fbq('track', 'Lead', params);
    else if (event === 'whatsapp_click' || event === 'phone_click' || event === 'email_click') window.fbq('track', 'Contact', { method: event });
    else window.fbq('trackCustom', event, params);
  }
  const tt = (window as any).ttq; // eslint-disable-line
  if (ttLoaded && tt?.track) tt.track(event === 'generate_lead' ? 'SubmitForm' : event, params);
}

export function initConsent() {
  const banner = document.querySelector<HTMLElement>('[data-cookie]');
  if (!banner) return;
  const panel = banner.querySelector<HTMLElement>('[data-cookie-panel]')!;
  const boxes = banner.querySelectorAll<HTMLInputElement>('[data-consent]');
  const save = (c: Omit<Consent, 'ts'>) => {
    consent = { ...c, ts: Date.now() };
    store.set(KEY, JSON.stringify(consent));
    applyConsent(consent);
    banner.hidden = true;
    document.documentElement.classList.add('consent-done');
  };
  if (consent) { applyConsent(consent); document.documentElement.classList.add('consent-done'); }
  else (document.fonts?.ready ?? Promise.resolve()).then(() => requestAnimationFrame(() => (banner.hidden = false))); // show after font swap: no layout shift

  banner.querySelector('[data-cookie-accept]')?.addEventListener('click', () => save({ analytics: true, marketing: true }));
  banner.querySelector('[data-cookie-necessary]')?.addEventListener('click', () => save({ analytics: false, marketing: false }));
  banner.querySelector('[data-cookie-toggle]')?.addEventListener('click', () => {
    panel.hidden = !panel.hidden;
    banner.querySelector<HTMLElement>('[data-cookie-save]')!.hidden = panel.hidden;
  });
  banner.querySelector('[data-cookie-save]')?.addEventListener('click', () => {
    const v: Record<string, boolean> = {}; boxes.forEach((b) => (v[b.dataset.consent!] = b.checked));
    save({ analytics: !!v.analytics, marketing: !!v.marketing });
  });
  document.querySelectorAll('[data-cookie-settings]').forEach((b) => b.addEventListener('click', () => {
    boxes.forEach((x) => (x.checked = !!consent?.[x.dataset.consent as 'analytics' | 'marketing']));
    banner.hidden = false; panel.hidden = false; banner.querySelector<HTMLElement>('[data-cookie-save]')!.hidden = false;
  }));

  // Declarative click tracking
  document.addEventListener('click', (e) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>('[data-track]');
    if (el) track(el.dataset.track!, { location: location.pathname });
  });
}

/** UTM parameters are kept for the session and stored with the lead. */
export function captureUtm() {
  const q = new URLSearchParams(location.search);
  const utm: Record<string, string> = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'].forEach((k) => { const v = q.get(k); if (v) utm[k] = v; });
  if (Object.keys(utm).length) session.set('bylado-utm', JSON.stringify({ ...utm, landing: location.pathname }));
  if (!session.get('bylado-landing')) session.set('bylado-landing', JSON.stringify({ landing: location.pathname, referrer: document.referrer || null }));
}
export function getUtm(): Record<string, string> {
  try { return { ...JSON.parse(session.get('bylado-landing') || '{}'), ...JSON.parse(session.get('bylado-utm') || '{}') }; } catch { return {}; }
}
