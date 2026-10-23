// Parte da sola a ogni invio dei form accettato da Netlify (gli invii marcati spam non la attivano).
// Sostituisce gli zap di Zapier: crea la card su Basecamp e, con il consenso, iscrive alla newsletter Brevo.
// La mail di notifica non passa da qui: è l'hook email nativo di Netlify, quindi arriva anche se questa funzione fallisce.

// Dove finisce ogni form su Basecamp: progetto (bucket) e colonna della card table. Non sono segreti.
const BASECAMP_ACCOUNT_ID = 4213406;
export const DESTINATIONS = {
  contatti: { project: 31844045, column: 5906094105 }, // Cantiere Sales Cycle → Primo Contatto
  candidature: { project: 38583156, column: 7678025930 }, // Cantiere Creativo - candidature - hr → Triage
};
const BREVO_LIST_ID = null; // lista "Cantiere Newsletter"

const escape = (value) =>
  String(value ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

const LABELS = {
  contatti: [
    ["nome", "Nome e cognome"],
    ["email", "Email"],
    ["telefono", "Telefono"],
    ["servizio", "Interessato a"],
    ["budget", "Budget"],
    ["origine", "Pagina di provenienza"],
    ["newsletter", "Newsletter"],
    ["messaggio", "Messaggio"],
  ],
  candidature: [
    ["nome", "Nome"],
    ["cognome", "Cognome"],
    ["email", "Email"],
    ["profilo", "Profilo"],
    ["posizione", "Posizione aperta"],
    ["link", "Link"],
    ["messaggio", "Messaggio"],
  ],
};

// Titolo e testo (HTML ammesso da Basecamp) della card. Tutto quello che arriva dal form è escapato.
export function buildCard(formName, data) {
  const services = data.servizio ? data.servizio.split("|").join(", ") : "";
  const title =
    formName === "candidature"
      ? [`${data.nome ?? ""} ${data.cognome ?? ""}`.trim(), data.profilo].filter(Boolean).join(" — ")
      : [data.nome, services].filter(Boolean).join(" — ");
  const rows = LABELS[formName]
    .filter(([key]) => data[key])
    .map(([key, label]) => {
      const value = key === "servizio" ? services : data[key];
      const html = escape(value).replace(/\r?\n/g, "<br>");
      const linked = key === "email" ? `<a href="mailto:${escape(value)}">${html}</a>` : /^https?:\/\//.test(value) ? `<a href="${escape(value)}">${html}</a>` : html;
      return `<div><strong>${label}:</strong> ${linked}</div>`;
    });
  return { title: title || "Nuovo invio dal sito", content: rows.join("") };
}

async function basecampToken() {
  const params = new URLSearchParams({
    type: "refresh",
    refresh_token: process.env.BASECAMP_REFRESH_TOKEN,
    client_id: process.env.BASECAMP_CLIENT_ID,
    client_secret: process.env.BASECAMP_CLIENT_SECRET,
  });
  const res = await fetch(`https://launchpad.37signals.com/authorization/token?${params}`, { method: "POST" });
  if (!res.ok) throw new Error(`Basecamp token: ${res.status} ${await res.text()}`);
  return (await res.json()).access_token;
}

async function createCard(formName, data) {
  const dest = DESTINATIONS[formName];
  if (!dest?.project || !dest?.column) return;
  const token = await basecampToken();
  const url = `https://3.basecampapi.com/${BASECAMP_ACCOUNT_ID}/buckets/${dest.project}/card_tables/lists/${dest.column}/cards.json`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "Cantiere Creativo sito (f.giovannetti@cantierecreativo.net)",
    },
    body: JSON.stringify(buildCard(formName, data)),
  });
  if (!res.ok) throw new Error(`Basecamp card: ${res.status} ${await res.text()}`);
}

// Solo chi ha spuntato la casella della newsletter: il consenso privacy del form non basta.
async function subscribeNewsletter(data) {
  if (data.newsletter !== "sì" || !data.email || !BREVO_LIST_ID) return;
  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: { "api-key": process.env.BREVO_API_KEY, "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email: data.email, listIds: [BREVO_LIST_ID], updateEnabled: true }),
  });
  if (!res.ok) throw new Error(`Brevo: ${res.status} ${await res.text()}`);
}

export default async (req) => {
  const { payload } = await req.json();
  const formName = payload?.form_name;
  const data = payload?.data ?? {};
  if (!LABELS[formName]) return new Response("form ignorato");
  // Le due azioni sono indipendenti: un errore su Brevo non deve bloccare la card, e viceversa.
  const results = await Promise.allSettled([createCard(formName, data), formName === "contatti" ? subscribeNewsletter(data) : null]);
  const errors = results.filter((r) => r.status === "rejected").map((r) => r.reason.message);
  if (errors.length) {
    console.error(errors.join("\n"));
    return new Response(errors.join("\n"), { status: 500 });
  }
  return new Response("ok");
};
