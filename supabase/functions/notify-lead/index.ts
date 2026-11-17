// Edge function: triggered by a Database Webhook on INSERT into public.leads.
// Sends (1) a notification to OWNER_EMAIL and (2) a short branded confirmation to the client, via Resend.
// Secrets: RESEND_API_KEY, MAIL_FROM (e.g. "By Lado <info@bylado.nl>", domain verified in Resend with SPF/DKIM).
const RESEND = Deno.env.get('RESEND_API_KEY')!;
const FROM = Deno.env.get('MAIL_FROM') ?? 'By Lado <info@bylado.nl>';
const TO_OWNER = Deno.env.get('OWNER_EMAIL') ?? '';

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
  const date = r.quiz?.answers ? `extension-check: ${(r.quiz.recommended ?? []).join(' / ')}` : (r.type ?? r.kind);
  const rows = Object.entries({ Soort: r.kind, Type: r.type, Naam: r.name, 'E-mail': r.email, Telefoon: r.phone, WhatsApp: r.whatsapp_ok ? 'ja' : 'nee',
    Dagdelen: (r.slots ?? []).join(', '), Bericht: r.message, Quiz: r.quiz ? JSON.stringify(r.quiz) : '', Calculator: r.calc ? JSON.stringify(r.calc) : '',
    Pagina: r.page, UTM: r.utm ? JSON.stringify(r.utm) : '', 'Foto’s': (r.files ?? []).join(', ') }).filter(([, v]) => v);
  const table = `<table style="font-family:Arial,sans-serif;font-size:14px">${rows.map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#6B5F57;vertical-align:top">${esc(k)}</td><td>${esc(v)}</td></tr>`).join('')}</table>`;
  if (TO_OWNER) await send(TO_OWNER, `By Lado · ${r.kind}: ${r.name ?? r.email} · ${date}`, `<h2 style="font-family:Georgia,serif;font-weight:400">Nieuwe aanvraag</h2>${table}`, r.email);
  if (r.kind !== 'guide' && r.name) {
    const nl = r.lang !== 'en'; const first = esc(String(r.name).split(' ')[0]);
    const html = nl ? `<p>Hoi ${first},</p><p>Dank je wel voor je aanvraag. Ik bekijk hem persoonlijk en neem snel contact met je op.</p><p>Liefs,<br>Quinty · By Lado</p>` : `<p>Hi ${first},</p><p>Thank you for your request. I’ll look at it personally and get back to you soon.</p><p>Love,<br>Quinty · By Lado</p>`;
    await send(r.email, nl ? 'Je aanvraag bij By Lado' : 'Your request at By Lado', `<div style="max-width:520px;margin:0 auto;padding:32px;background:#F7F2EB;color:#1F1814;font-family:Arial,sans-serif;font-size:15px;line-height:1.6"><p style="letter-spacing:.42em;font-weight:600">BY LADO</p>${html}</div>`);
  }
  // TODO guide: send the PDF link once the guide exists.
  return new Response('ok');
});
