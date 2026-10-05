// Contenuti statici della pagina Lab dell'Atlante degli Uffizi.
// Fonti: sessioni dell'agente del 17/09/2026 (orari locali), git log del repo dell'atlante,
// rapporto di censimento (COVERAGE.md) e verifiche (VERIFICATION.md).

export const ATLAS_URL = "https://mappa-uffizi.vercel.app";

const atlanteUffizi = {
  model: "lab_project",
  id: "lab-atlante-uffizi",
  slug: "atlante-uffizi",
  title: "L'atlante 3D degli Uffizi, online in un giorno",
  shortTitle: "Atlante degli Uffizi",
  abstract:
    "Un agente AI ha letto i cataloghi e scritto il codice insieme a noi. Noi abbiamo scelto cosa mostrare e, soprattutto, come mostrarlo. Si può fare anche per te.",
  previewText:
    "L'atlante 3D della Galleria degli Uffizi, costruito con l'AI sui cataloghi pubblici del Ministero della Cultura.",
  status: "Online",
  dataDate: "2026-09-17",
  atlasUrl: ATLAS_URL,
  media: {
    poster: "/lab/atlante-uffizi/atlante-poster.jpg",
    video: "/lab/atlante-uffizi/atlante-loop.mp4",
    width: 1150,
    height: 900,
    alt: "La pianta 3D del secondo piano degli Uffizi nell'atlante, con l'elenco delle sale",
    caption: "L'atlante online: secondo piano, vista 3D",
  },
  seo: {
    title: "Come abbiamo costruito l'atlante 3D degli Uffizi con l'AI",
    description:
      "Un agente AI, due persone, una giornata per la prima versione. Come Cantiere Creativo ha unito AI e lavoro umano per costruire l'atlante degli Uffizi.",
    image: "/lab/atlante-uffizi/og-atlante-uffizi.jpg",
  },
  heroActions: {
    primary: { label: "Apri l'atlante" },
    secondary: { label: "Parliamo del tuo progetto" },
  },
  facts: {
    eyebrow: "Il progetto",
    title: "L'atlante in tre numeri",
    // Fonti: sessioni dell'agente del 17/09 (brief 10:31, prova su iPad 11:32), COVERAGE.md (1.887 schede, 91 ambienti con opere su 3 piani).
    items: [
      { id: "f-ora", number: "1 ora", label: "dal brief alla prima versione, provata su iPad" },
      { id: "f-opere", number: "1.887", label: "opere, solo da fonti pubbliche" },
      { id: "f-sale", number: "91", label: "sale e ambienti navigabili, su 3 piani" },
    ],
  },
  story: {
    eyebrow: "Persone e AI",
    title: "L'agente esegue, noi decidiamo",
    text: "Leggere migliaia di schede e scrivere il codice è compito dell'agente. Provare, correggere e scegliere cosa mostrare è compito nostro.",
    legend: { human: "Noi", ai: "Agente AI", both: "Noi + agente" },
    steps: [
      { id: "s1", time: "10:30", who: "human", title: "Il brief", text: "Chiediamo un atlante 3D di tutti i piani e di tutte le sale, con ogni opera cliccabile e utilizzabile anche da telefono." },
      { id: "s2", time: "10:40", who: "ai", title: "Il piano e il codice", text: "L'agente prepara il piano, legge le fonti pubbliche e costruisce l'atlante: pianta 3D, sale, schede delle opere." },
      { id: "s3", time: "11:05", who: "human", title: "Un piano B", text: "Chiediamo che l'atlante funzioni anche sui dispositivi che non gestiscono il 3D." },
      { id: "s4", time: "11:20", who: "ai", title: "La prima versione", text: "L'agente pubblica la prima versione, pronta da provare." },
      { id: "s5", time: "11:30", who: "human", title: "La prova su iPad", text: "Proviamo l'atlante su un iPad vero: sale vuote e difetti nel 3D. Lo rimandiamo indietro." },
      { id: "s6", time: "11:50", who: "human", title: "Tutte le opere, nessuna esclusa", text: "Pretendiamo tutte le opere di tutte le sale. L'agente rilegge le pagine del museo e il catalogo nazionale." },
      { id: "s7", time: "12:05", who: "human", title: "Solo fonti pubbliche", text: "L'agente chiede un inventario riservato. Rispondiamo: usa le fonti pubbliche. Dove non bastano, lo diciamo chiaramente." },
      { id: "s8", time: "14:50", who: "both", title: "Online per tutti", text: "Decidiamo di aprire l'atlante a tutti. L'agente lo rende pubblico." },
      { id: "s9", time: "15:20", who: "human", title: "Il nostro occhio", text: "Chiediamo all'agente di mettere ordine nel progetto. Da qui lo prende in mano il nostro team, che ne ridisegna l'interfaccia." },
    ],
  },
  tools: {
    eyebrow: "Gli strumenti",
    title: "Cosa abbiamo usato",
    text: "Strumenti diversi, un solo criterio: ogni cosa che l'AI produce passa da una persona prima di andare online.",
    items: [
      { id: "t-agente", title: "Un agente di sviluppo", text: "Codex, un agente di intelligenza artificiale: progetta, scrive il codice e controlla il proprio lavoro. Noi gli diamo la direzione." },
      { id: "t-dati", title: "Dati pubblici", text: "Le pagine del sito degli Uffizi e il catalogo nazionale dei beni culturali del Ministero. Nessuna fonte riservata." },
      { id: "t-3d", title: "3D nel browser", text: "La pianta e le sale si esplorano in 3D, senza installare nulla. Se il dispositivo non regge il 3D, l'atlante passa a una versione più leggera." },
      { id: "t-test", title: "Controlli automatici", text: "Un programma apre una per una tutte le 1.887 schede, su Chrome e su Safari, e prova l'atlante come su un iPad." },
      { id: "t-design", title: "Design del team", text: "Interfaccia, impaginazione e grafica le abbiamo decise noi, rivedendo a mano quello che l'agente aveva proposto." },
      { id: "t-pubblicazione", title: "Pubblicazione", text: "L'atlante è online e ogni modifica arriva in pochi minuti." },
    ],
  },
  cta: {
    id: "per-te",
    eyebrow: "Per la tua azienda, il tuo museo, il tuo ente",
    title: "Hai un'idea? La costruiamo così",
    text: "Lo stesso modo di lavorare, sul tuo progetto:",
    deliverables: [
      "un prototipo funzionante in pochi giorni, non in mesi",
      "le scelte di design e di contenuto fatte da persone",
      "online, misurabile, pronto da far crescere",
    ],
    callLabel: "Prenota una video call",
    formTitle: "Oppure raccontaci la tua idea",
    formText: "Scrivici cosa hai in mente: ti risponderemo entro 24 ore.",
    origin: "lab-atlante-uffizi",
    interests: ["Prototipo rapido", "Agenti AI", "Consulenza AI", "Atlante o mappa per un museo"],
  },
};

export default atlanteUffizi;
