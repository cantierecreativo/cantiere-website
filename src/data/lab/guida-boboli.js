// Contenuti statici della pagina Lab della guida del Giardino di Boboli.
// Fonti: repo cantierecreativo/boboli-poc (9 prototipi e voto del team, 9–10/10/2026) e
// cantierecreativo/boboli-guida (git log 12–15/10/2026, context/00-brief.md, 04-content.md, 05-decisions.md).

// Indirizzo pubblico della guida: tutti i link della pagina passano da qui.
export const GUIDA_BOBOLI_URL = "https://mappa-giardino-boboli.cantierecreativo.net";

const guidaBoboli = {
  model: "lab_project",
  id: "lab-guida-boboli",
  slug: "guida-giardino-boboli",
  title: "Il Giardino di Boboli in 3D, con i percorsi sui viali veri",
  shortTitle: "Guida del Giardino di Boboli",
  abstract:
    "Abbiamo disegnato la mappa del Giardino di Boboli per le Gallerie degli Uffizi. Nel Lab è diventata una guida: diciotto luoghi, i percorsi a piedi calcolati sui viali veri e un volo in 3D fino alla meta. Un agente AI ha scritto il codice; cosa mostrare, e come, l'abbiamo deciso noi.",
  previewText:
    "Un progetto del Lab di Cantiere Creativo: la mappa illustrata del Giardino di Boboli diventa una guida in 3D, con diciotto luoghi e i percorsi calcolati sui viali veri.",
  status: "Online",
  dataDate: "2026-10-15",
  atlasUrl: GUIDA_BOBOLI_URL,
  about: {
    "@type": "Park",
    name: "Giardino di Boboli",
    address: { "@type": "PostalAddress", addressLocality: "Firenze", addressCountry: "IT" },
  },
  media: {
    poster: "/lab/guida-boboli/guida-3d.jpg",
    video: "/lab/guida-boboli/guida-3d.mp4",
    width: 1780,
    height: 1108,
    alt: "La guida del Giardino di Boboli: la copertina con la mappa illustrata, poi il volo in 3D lungo il percorso dall'ingresso di Palazzo Pitti al Kaffeehaus",
    caption: "La guida online: il volo in 3D verso il Kaffeehaus",
  },
  seo: {
    title: "Come abbiamo trasformato la mappa di Boboli in una guida 3D con l'AI",
    description:
      "Un agente AI, la mappa illustrata del Giardino di Boboli e le scelte del nostro team: come Cantiere Creativo ha costruito una guida con percorsi veri e volo in 3D.",
    image: "/lab/guida-boboli/og-guida-boboli.jpg",
  },
  heroActions: {
    primary: { label: "Apri la guida" },
    secondary: { label: "Parliamo del tuo progetto" },
  },
  facts: {
    eyebrow: "Il progetto",
    title: "La guida in tre numeri",
    // Fonti: boboli-poc (9 prototipi, voto D-03/D-04), luoghi.js (18 luoghi), D-03 (~1.600 alberi nella scena 3D).
    items: [
      { id: "f-prototipi", number: "9", label: "prototipi provati e votati dal team prima di scegliere la strada" },
      { id: "f-luoghi", number: "18", label: "luoghi del giardino, con storia, cosa vedere e fonti" },
      { id: "f-alberi", number: "1.600", label: "alberi circa, nel giardino in 3D ricostruito dalla mappa" },
    ],
    note: "Un progetto del nostro Lab, non commissionato dalle Gallerie degli Uffizi: è un prototipo, non un servizio ufficiale, e le schede dei luoghi sono ancora in bozza.",
  },
  chapters: {
    eyebrow: "Come l'abbiamo fatto",
    title: "Dalla mappa disegnata a una guida che si usa",
    items: [
      {
        id: "c-percorsi",
        title: "I percorsi sui viali veri",
        text: "La guida calcola la strada sul disegno dei viali della mappa, non in linea d'aria: distanza, tempo a piedi, salite e indicazioni passo per passo. Le quote vengono dal rilievo LiDAR 2023 del Comune di Firenze.",
        points: [
          "da un ingresso o da un luogo all'altro, anche evitando le salite ripide",
          "un avviso quando un percorso senza salite ripide non esiste",
          "il profilo del percorso, con scale e rampe brevi",
        ],
        image: {
          src: "/lab/guida-boboli/percorso.jpg",
          alt: "La guida con il percorso dall'ingresso di Palazzo Pitti al Kaffeehaus: a sinistra distanza, tempo, salita, profilo e indicazioni, a destra la linea rossa sui viali del giardino in 3D",
          width: 1200,
          height: 1000,
        },
      },
      {
        id: "c-volo",
        title: "Un volo in 3D fino alla meta",
        text: "Il giardino in 3D è ricostruito dai disegni originali della mappa: viali, prati, palazzi e monumenti. La camera segue la linea mentre si disegna. Quanto in alto, quanto veloce e quanto lenta nelle curve l'abbiamo deciso noi, provandola volo dopo volo.",
        points: [
          "palazzi e monumenti presi dal poster del giardino",
          "«Salta il volo», o il tasto Esc, per andare subito al risultato",
          "con il movimento ridotto niente volo: tutto resta anche in testo",
        ],
        image: {
          src: "/lab/guida-boboli/volo-3d.jpg",
          alt: "Il giardino di Boboli in 3D visto dall'alto durante il volo: alberi, viali, la vasca dell'Anfiteatro e la linea rossa del percorso",
          width: 1200,
          height: 1000,
        },
      },
      {
        id: "c-telefono",
        title: "Pensata per chi prepara la visita",
        text: "Si usa da casa, dal computer o dal telefono. Ogni luogo ha la sua pagina, da cercare su Google e da condividere, e ogni percorso ha un link che si riapre identico.",
        points: [
          "su telefono la mappa sta sopra e la scheda scorre sotto",
          "tre itinerari tappa per tappa, segnando cosa hai visto",
          "accessibile da tastiera e con screen reader, secondo le WCAG 2.2 AA",
        ],
        image: {
          src: "/lab/guida-boboli/telefono.jpg",
          alt: "La guida su uno smartphone: in alto il giardino in 3D con i segnaposto, sotto il percorso dall'ingresso di Palazzo Pitti alla Vasca dell'Isola con distanza, tempo e salita",
          width: 1200,
          height: 1000,
        },
      },
    ],
  },
  story: {
    eyebrow: "Persone e AI",
    title: "Nove prototipi, una scelta del team",
    text: "L'agente prototipa, scrive il codice e misura. Noi proviamo la guida, scegliamo la direzione e decidiamo cosa cambiare.",
    legend: { human: "Noi", ai: "Agente AI", both: "Noi + agente" },
    // Date reali dei passaggi, non mostrate in pagina: s1–s2 9–10/10, s3–s4 12/10, s5–s9 13/10, pubblicazione 13–15/10.
    steps: [
      { id: "s1", who: "both", title: "Nove idee sulla mappa", text: "Chiediamo all'agente prototipi rapidi sulla mappa del giardino: ne arrivano nove, dalla mappa in esploso al volo di un drone." },
      { id: "s2", who: "human", title: "Il voto del team", text: "I colleghi provano i prototipi e li votano. Scegliamo di unire «I luoghi del giardino» e «Il percorso a scorrimento»." },
      { id: "s3", who: "ai", title: "La prima guida", text: "L'agente costruisce la guida: percorsi calcolati sui viali della mappa e volo in 3D fino al luogo scelto." },
      { id: "s4", who: "human", title: "Più istituzionale", text: "Chiediamo un tono più ufficiale: una copertina con tre scelte (luoghi, percorso, itinerari) e una scheda per ogni luogo, con le fonti." },
      { id: "s5", who: "both", title: "Quote vere", text: "Le salite stimate dal disegno non bastano. Scegliamo il rilievo LiDAR 2023 del Comune di Firenze e l'agente ricalcola le quote." },
      { id: "s6", who: "human", title: "Il volo, più lento", text: "Proviamo il volo: troppo veloce e staccato dalla linea. Lo vogliamo più lento nelle curve, con la camera che segue la punta." },
      { id: "s7", who: "ai", title: "Al centro del viale", text: "L'agente misura i percorsi: troppi corrono sul bordo dei viali. Li ricalcola su un grafo dei viali, al centro della strada." },
      { id: "s8", who: "human", title: "Chi fa fatica a camminare", text: "Chiediamo un avviso quando non c'è un percorso senza salite ripide: chi ha un passeggino o una carrozzina deve saperlo prima." },
      { id: "s9", who: "both", title: "Online", text: "Una pagina per ogni luogo, link da condividere, statistiche solo con il consenso. Decidiamo il dominio e pubblichiamo." },
    ],
  },
  tools: {
    eyebrow: "Per musei, parchi e luoghi da visitare",
    title: "Cosa può fare per il tuo luogo",
    text: "La stessa guida, sulla tua mappa e sui tuoi contenuti.",
    items: [
      { id: "t-mappa", title: "Dalla mappa che hai già", text: "Partiamo dalla mappa illustrata o dalla pianta che i tuoi visitatori conoscono." },
      { id: "t-percorsi", title: "Percorsi veri", text: "Calcolati sui tuoi viali o sui tuoi corridoi, con tempi, salite e indicazioni." },
      { id: "t-schede", title: "Una scheda per ogni luogo", text: "Storia, cosa vedere, informazioni pratiche e fonti, scritte e riviste con te." },
      { id: "t-itinerari", title: "Itinerari", text: "Giri tematici tappa per tappa, che il visitatore segue e spunta." },
      { id: "t-accessibile", title: "Accessibile", text: "Tutto quello che mostra il 3D esiste anche in testo, secondo le WCAG 2.2 AA." },
      { id: "t-trovabile", title: "Trovabile", text: "Una pagina per ogni luogo, indicizzabile e da condividere con un link." },
    ],
  },
  cta: {
    id: "per-te",
    eyebrow: "Per il tuo museo, il tuo parco, il tuo ente",
    title: "Hai una mappa? La facciamo camminare",
    text: "Lo stesso modo di lavorare, sul tuo luogo:",
    deliverables: [
      "un prototipo funzionante in pochi giorni, non in mesi",
      "le scelte di design e di contenuto fatte da persone",
      "online, misurabile, pronto da far crescere",
    ],
    callLabel: "Prenota una video call",
    formTitle: "Oppure raccontaci la tua idea",
    formText: "Scrivici cosa hai in mente: ti risponderemo entro 24 ore.",
    origin: "lab-guida-boboli",
    interests: ["Mappa interattiva o guida", "Prototipo rapido", "Agenti AI", "Consulenza AI"],
  },
};

export default guidaBoboli;
