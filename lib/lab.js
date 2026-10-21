// Helper per la sezione Lab (contenuti su DatoCMS: lab_index e lab_project).

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.cantierecreativo.net";

// L'agenzia nei dati strutturati: stesso @id in tutte le pagine, così i motori collegano le pagine all'organizzazione.
export const ORGANIZATION = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Cantiere Creativo",
  url: SITE_URL,
  logo: `${SITE_URL}/logos/color.png`,
  sameAs: [
    "https://www.linkedin.com/company/cantiere-creativo/",
    "https://www.instagram.com/cantiere_creativo_/",
    "https://www.facebook.com/cantierecreativo",
  ],
};

export const CALENDLY_URL = "https://calendly.com/francesco-giovannetti-cantiere-creativo/meet";

// I campi "una voce per riga" di Dato.
export const lines = (text) => (text || "").split("\n").map((l) => l.trim()).filter(Boolean);

// Video e anteprima di un progetto nella forma letta da LabVideo.
export function labMedia(project) {
  const { poster, video, videoCaption } = project;
  return { poster: poster.url, video: video.url, width: poster.width, height: poster.height, alt: poster.alt, caption: videoCaption };
}

// Eventi per GTM: la configurazione dei tag GA4 resta in Google Tag Manager.
// Ogni evento riscrive tutte le chiavi, così GTM non eredita valori dagli eventi precedenti.
export function trackLab(event, params = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    lab_project: params.project ?? null,
    position: params.position ?? null,
    opera: params.opera ?? null,
  });
}

export { SITE_URL };
