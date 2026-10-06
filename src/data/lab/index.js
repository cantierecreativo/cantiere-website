import atlanteUffizi from "./atlante-uffizi";
import uffiziAtlas from "./atlante-uffizi.en";
import labIndexEn from "./lab-index.en";

// Contenuti del Lab per lingua. Lo stesso progetto ha lo stesso `id` in ogni lingua
// e uno slug tradotto: `alts` collega le versioni per il selettore di lingua e gli hreflang.
const projectsByLocale = {
  it: [atlanteUffizi],
  en: [uffiziAtlas],
};

export function getLabProjects(locale = "it") {
  return projectsByLocale[locale] || projectsByLocale.it;
}

export function getLabProject(slug, locale = "it") {
  return getLabProjects(locale).find((p) => p.slug === slug) || null;
}

export function getLabAlts(id) {
  return Object.entries(projectsByLocale)
    .map(([locale, list]) => ({ locale, value: list.find((p) => p.id === id)?.slug }))
    .filter((alt) => alt.value);
}

export function getLabIndex(locale = "it") {
  return locale === "en" ? labIndexEn : labIndex;
}

const labIndex = {
  model: "lab_index",
  id: "lab-index",
  slug: "lab",
  title: "L'AI ci rende veloci. Il gusto ci rende diversi. L'esperienza ci rende affidabili.",
  heroLines: [
    { id: "h1", text: "L'AI ci rende veloci." },
    { id: "h2", text: "Il gusto ci rende diversi." },
    { id: "h3", text: "L'esperienza ci rende affidabili.", accent: true },
  ],
  abstract:
    "Usiamo agenti e AI a ogni livello. Poi ci mettiamo quello che all'AI manca: l'occhio per ciò che è bello e il giudizio su ciò che serve davvero. Il Lab raccoglie i prodotti che lo dimostrano.",
  heroActions: {
    primary: { label: "Guarda i progetti", href: "#progetti" },
    secondary: { label: "Prenota una video call" },
  },
  seo: {
    title: "Cantiere Creativo Lab: l'AI ci rende veloci, il gusto diversi",
    description:
      "Usiamo agenti e AI a ogni livello, poi ci mettiamo l'occhio per ciò che è bello e serve davvero. Nel Lab trovi i prodotti che lo dimostrano.",
    image: "/lab/atlante-uffizi/og-atlante-uffizi.jpg",
  },
  manifesto: {
    eyebrow: "Come lavoriamo",
    title: "Niente pilota automatico.",
    items: [
      {
        id: "mf-ai",
        title: "AI a ogni livello",
        text: "Agenti e intelligenza artificiale lavorano con noi in tutto il progetto: idee, design, codice, contenuti.",
      },
      {
        id: "mf-gusto",
        title: "Scelte fatte da persone",
        text: "Decidiamo noi cosa è bello e cosa ha senso mettere davanti a chi visita. Il resto lo togliamo.",
      },
      {
        id: "mf-prova",
        title: "Prodotti veri, online",
        text: "Non promesse: ogni progetto del Lab si apre e si prova. Giudica tu.",
      },
    ],
  },
  projects: {
    id: "progetti",
    eyebrow: "I progetti",
    title: "La prova è quello che costruiamo",
    text: "Ogni progetto del Lab nasce così: veloce grazie all'AI, rifinito dalle nostre scelte.",
  },
  services: {
    eyebrow: "Cosa facciamo per te",
    title: "Mettiamo l'AI al lavoro anche per te",
    // Link nascosti finché non sono pronte le pagine dei tre servizi.
    showLinks: false,
    items: [
      {
        id: "srv-agenti",
        title: "Agenti per il tuo business",
        text: "Costruiamo agenti AI che lavorano dentro i tuoi strumenti: rispondono, compilano, smistano richieste, aggiornano contenuti. Tu decidi le regole, noi li rendiamo affidabili.",
        href: "/tecnologie/intelligenza-artificiale",
        linkLabel: "Scopri come",
      },
      {
        id: "srv-prototipi",
        title: "Prototipi rapidi, poi rifiniti",
        text: "Trasformiamo la tua idea in un prototipo che funziona in pochi giorni. Lo provi, lo correggiamo insieme e lo rifiniamo fino al prodotto finale.",
        href: "/soluzioni/blueprint",
        linkLabel: "Scopri il metodo",
      },
      {
        id: "srv-consulenza",
        title: "Consulenza sull'AI",
        text: "Ti aiutiamo a capire dove l'AI serve davvero nel tuo lavoro: formazione per il team, scelta degli strumenti, regole d'uso in linea con l'AI Act.",
        call: true,
        linkLabel: "Parliamone",
      },
    ],
  },
  cta: {
    title: "Ti piace come lavoriamo?",
    text: "Il prossimo progetto del Lab può essere il tuo. Raccontaci cosa hai in mente.",
    callLabel: "Prenota una video call",
  },
};
