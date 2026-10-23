// Ogni mattina controlla lo spam dei form: un invio marcato spam non fa partire né la notifica né la card,
// quindi un contatto vero scartato per errore si perderebbe in silenzio. Se nelle ultime 24 ore c'è qualcosa,
// manda una mail con l'elenco e il link alla pagina dei form su Netlify, dove si segna "non spam".
import { SENDER, escape } from "./submission-created.mjs";

const DAY = 24 * 60 * 60 * 1000;

// Testo della mail a partire dagli invii in spam ({ form, data, created_at }).
export function buildSpamEmail(items, formsUrl) {
  const rows = items.map(({ form, data, created_at }) => {
    const when = new Date(created_at).toLocaleString("it-IT", { timeZone: "Europe/Rome", dateStyle: "short", timeStyle: "short" });
    const who = [data.nome, data.cognome].filter(Boolean).join(" ") || "senza nome";
    const text = String(data.messaggio ?? "").slice(0, 200);
    return `<li><strong>${escape(form)}</strong>, ${escape(when)}: ${escape(who)} &lt;${escape(data.email ?? "senza email")}&gt;<br>${escape(text)}</li>`;
  });
  const count = items.length;
  return {
    subject: `Sito: ${count} ${count === 1 ? "invio finito" : "invii finiti"} nello spam dei form`,
    htmlContent: `<p>Nelle ultime 24 ore il filtro antispam di Netlify ha scartato ${count === 1 ? "questo invio" : "questi invii"}. Se uno è vero, segnalo come "Verified" (non spam): partono la card su Basecamp, la notifica e l'eventuale risposta al candidato.</p>
<ul>${rows.join("")}</ul>
<p><a href="${escape(formsUrl)}">Apri i form su Netlify</a></p>`,
  };
}

async function netlify(path) {
  const res = await fetch(`https://api.netlify.com/api/v1${path}`, { headers: { Authorization: `Bearer ${process.env.NETLIFY_SPAM_TOKEN}` } });
  if (!res.ok) throw new Error(`Netlify ${path}: ${res.status}`);
  return res.json();
}

export default async (req, context) => {
  const siteId = context.site.id;
  const since = Date.now() - DAY;
  const forms = await netlify(`/sites/${siteId}/forms`);
  const items = [];
  for (const form of forms) {
    const spam = await netlify(`/forms/${form.id}/submissions?state=spam&per_page=100`);
    for (const s of spam) if (Date.parse(s.created_at) > since) items.push({ form: form.name, data: s.data, created_at: s.created_at });
  }
  if (!items.length) return new Response("niente spam");
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": process.env.BREVO_API_KEY, "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      sender: SENDER,
      to: [SENDER],
      ...buildSpamEmail(items, `https://app.netlify.com/projects/${context.site.name}/forms`),
    }),
  });
  if (!res.ok) throw new Error(`Brevo avviso spam: ${res.status} ${await res.text()}`);
  return new Response(`avviso inviato: ${items.length}`);
};

// Tutti i giorni alle 6:00 UTC (le 8 in Italia d'estate, le 7 d'inverno).
export const config = { schedule: "0 6 * * *" };
