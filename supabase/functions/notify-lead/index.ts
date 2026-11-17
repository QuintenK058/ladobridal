// Edge function: triggered by a Database Webhook on INSERT into public.leads.
// Sends (1) a notification to info@ladobridal.com and (2) a short branded confirmation to the bride, via Resend.
// Secrets: RESEND_API_KEY, MAIL_FROM (e.g. "Lado Bridal <info@ladobridal.com>", domain verified in Resend with SPF/DKIM).
const RESEND = Deno.env.get('RESEND_API_KEY')!;
const FROM = Deno.env.get('MAIL_FROM') ?? 'Lado Bridal <info@ladobridal.com>';
const TO_OWNER = 'info@ladobridal.com';

const esc = (s: unknown) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
const send = (to: string, subject: string, html: string, replyTo?: string) =>
  fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM, to, subject, html, ...(replyTo ? { reply_to: replyTo } : {}) }),
  });

Deno.serve(async (req) => {
  const { record: r } = await req.json();
  if (!r?.email) return new Response('no record', { status: 400 });
  const date = r.wedding_date ?? `${r.wedding_month ?? '?'}-${r.wedding_year ?? '?'}`;
  const rows = [
    ['Trouwdatum', date], ['Dienst', r.service], ['Regio', r.region + (r.country ? ` (${r.country})` : '')], ['Locatie', r.venue],
    ['Personen extra', r.persons], ['Moeder van de bruid', r.mother ? 'ja' : 'nee'], ['Naam', r.name], ['E-mail', r.email], ['Telefoon', r.phone],
    ['Gevonden via', r.source], ['Bericht', r.message], ['Calculator', r.calc ? JSON.stringify(r.calc) : ''], ['Pagina', r.page],
    ['UTM', r.utm ? JSON.stringify(r.utm) : ''], ['Foto’s', (r.files ?? []).join(', ')],
  ].filter(([, v]) => v);
  const table = `<table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${rows.map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#6F625A;vertical-align:top">${esc(k)}</td><td style="padding:6px 0">${esc(v)}</td></tr>`).join('')}</table>`;
  await send(TO_OWNER, `Nieuwe aanvraag: ${r.name} · ${date} · ${r.service}`, `<h2 style="font-family:Georgia,serif;font-weight:400">Nieuwe aanvraag</h2>${table}`, r.email);

  const nl = r.lang !== 'en';
  const first = esc(String(r.name).split(' ')[0]);
  const body = nl
    ? `<p>Hoi ${first},</p><p>Dank je wel voor je aanvraag voor ${esc(date)}. Ik bekijk hem persoonlijk en je ontvangt binnen 2 werkdagen een persoonlijke offerte.</p><p>Liefs,<br>Quinty<br><span style="color:#6F625A">Lado Bridal · ladobridal.com</span></p>`
    : `<p>Hi ${first},</p><p>Thank you for your request for ${esc(date)}. I’ll look at it personally and you’ll receive a personal quote within 2 working days.</p><p>Love,<br>Quinty<br><span style="color:#6F625A">Lado Bridal · ladobridal.com</span></p>`;
  await send(r.email, nl ? 'Je aanvraag bij Lado Bridal' : 'Your request at Lado Bridal',
    `<div style="max-width:520px;margin:0 auto;padding:32px;background:#FAF7F2;color:#2B2420;font-family:Arial,sans-serif;font-size:15px;line-height:1.6"><p style="font-family:Georgia,serif;letter-spacing:.3em;font-size:18px">LADO BRIDAL</p>${body}</div>`);
  return new Response('ok');
});
