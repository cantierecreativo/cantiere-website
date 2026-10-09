// Contenuti statici della pagina Lab del configuratore 3D delle sedute Quinti.
// Fonti: sessione dell'agente del 7/10/2026 (brief 11:14, ora locale), git log del repo
// cantierecreativo/configuratore-sedute-3d, context/07-iterazioni.md e 05-decisions.md.

// Indirizzo pubblico del configuratore: tutti i link della pagina passano da qui.
export const CONFIGURATOR_URL = "https://configuratore-sedute.cantierecreativo.net";

const configuratoreSedute = {
  model: "lab_project",
  id: "lab-configuratore-sedute",
  slug: "configuratore-sedute-3d",
  title: "Il configuratore 3D delle sedute Quinti, online in un giorno",
  shortTitle: "Configuratore sedute 3D",
  abstract:
    "Un agente AI ha trasformato i file CAD in un configuratore in 75 minuti. Noi l'abbiamo provato, corretto e rifinito finché non è diventato bello e affidabile. Si può fare anche con il tuo catalogo.",
  previewText:
    "Il configuratore 3D, con realtà aumentata, delle sedute Quinti: costruito con l'AI sui file CAD e sulle schede tecniche del produttore.",
  status: "Online",
  dataDate: "2026-10-08",
  atlasUrl: CONFIGURATOR_URL,
  about: { "@type": "Organization", name: "Quinti Sedute", url: "https://quinti.com" },
  media: {
    poster: "/lab/configuratore-sedute/configuratore-3d.jpg",
    video: "/lab/configuratore-sedute/configuratore-3d.mp4",
    width: 1780,
    height: 1108,
    alt: "Il configuratore della Deep Executive: la sedia cambia rivestimento e colore, poi si gira di lato",
    caption: "Il configuratore online: la Deep Executive cambia rivestimento",
  },
  seo: {
    title: "Come abbiamo costruito un configuratore 3D di sedute con l'AI",
    description:
      "Un agente AI, i file CAD di Quinti e le scelte del nostro team: come Cantiere Creativo ha costruito in due giorni un configuratore 3D con realtà aumentata.",
    image: "/lab/configuratore-sedute/og-configuratore-sedute.jpg",
  },
  heroActions: {
    primary: { label: "Prova il configuratore" },
    secondary: { label: "Parliamo del tuo progetto" },
  },
  facts: {
    eyebrow: "Il progetto",
    title: "Il configuratore in tre numeri",
    // Fonti: brief alle 11:14 e prima versione configurabile alle 12:28 del 7/10; 18 GLB in public/models,
    // il più pesante 0,45 MB; 34 iterazioni in context/07-iterazioni.md.
    items: [
      { id: "f-minuti", number: "75 minuti", label: "dal brief alla prima sedia configurabile in 3D" },
      { id: "f-modelli", number: "18", label: "modelli 3D ricavati dai file CAD, ognuno sotto il mezzo megabyte" },
      { id: "f-scelte", number: "34", label: "scelte del nostro team dopo la prima versione" },
    ],
  },
  chapters: {
    eyebrow: "Il metodo del Lab",
    title: "Tre frasi, tre prove",
    items: [
      {
        id: "c-veloci",
        line: "L'AI ci rende veloci.",
        title: "Dai file CAD al browser in 75 minuti",
        text: "Quinti pubblica schede tecniche e modelli 3D dei suoi prodotti. L'agente (Claude Code) li ha letti, li ha trasformati in modelli leggeri per il web e ha scritto le regole del catalogo: quali opzioni esistono e quali stanno insieme.",
        points: [
          "6 prodotti e 18 varianti 3D, dai file OBJ e FBX del produttore",
          "modelli leggeri, che si caricano anche da telefono",
          "le combinazioni impossibili in scheda tecnica non si possono scegliere",
        ],
        image: {
          src: "/lab/configuratore-sedute/prodotti.jpg",
          alt: "Le sei sedute Quinti del configuratore in 3D: Deep Executive, Chance Net, Hanami, Club, Amelie Lounge e Olga",
          width: 1200,
          height: 1000,
        },
      },
      {
        id: "c-diversi",
        line: "Il gusto ci rende diversi.",
        title: "Quello che conta lo vede chi prova",
        text: "L'AI fa quello che le chiedi. Accorgersi che qualcosa non va, e decidere come deve essere, resta compito nostro. Provando il configuratore abbiamo notato che i rivestimenti sembravano tutti uguali: ora ogni tessuto ha le sue foto e i suoi colori veri.",
        points: [
          "268 colori reali, con foto e codici del catalogo Quinti",
          "34 scelte del team dopo la prima versione, dall'animazione della home alle icone",
          "l'ordine della home rivisto secondo i principi di UX",
        ],
        image: {
          src: "/lab/configuratore-sedute/prima-dopo.jpg",
          alt: "La stessa poltrona Club due volte: a sinistra con un colore piatto, a destra con la foto del tessuto bouclé, che ne mostra la trama",
          width: 1200,
          height: 1000,
        },
      },
      {
        id: "c-affidabili",
        line: "L'esperienza ci rende affidabili.",
        title: "Funziona anche fuori dallo schermo",
        text: "In realtà aumentata la sedia compare nella stanza in scala reale, quindi le misure devono essere giuste. Abbiamo confrontato ogni modello con la scheda tecnica: nel file l'Amelie Lounge era alta 96 cm, quella vera 81.",
        points: [
          "realtà aumentata su iPhone e Android senza app, anche da Chrome su iPhone",
          "misure reali sul modello, a portata di dito",
          "accessibile da tastiera e con screen reader, secondo le WCAG 2.2 AA",
        ],
        image: {
          src: "/lab/configuratore-sedute/telefono.jpg",
          alt: "Il configuratore su smartphone: l'Amelie Lounge in tessuto verde con le misure reali, seduta 36–42 cm e altezza 75–81 cm",
          width: 1200,
          height: 1000,
        },
      },
    ],
  },
  story: {
    eyebrow: "Persone e AI",
    title: "Due giorni, passo per passo",
    text: "L'agente scrive il codice e converte i modelli. Noi lo proviamo su telefono, in realtà aumentata e con il catalogo vero, e decidiamo cosa cambiare.",
    legend: { human: "Noi", ai: "Agente AI", both: "Noi + agente" },
    steps: [
      { id: "s1", time: "7/10 11:15", who: "human", title: "Il brief", text: "Chiediamo un configuratore 3D da proporre alle aziende di arredo, sul catalogo vero di Quinti e con la realtà aumentata. Niente foto: il 3D." },
      { id: "s2", time: "11:40", who: "ai", title: "Dai file CAD al web", text: "L'agente legge la scheda tecnica, converte i modelli 3D del produttore in file leggeri per il browser e scrive le regole del catalogo." },
      { id: "s3", time: "12:28", who: "ai", title: "La prima versione", text: "La Deep Executive è configurabile: schienale, braccioli, rivestimento, base e ruote." },
      { id: "s4", time: "13:20", who: "human", title: "Di più, e più bello", text: "Chiediamo più prodotti, comandi visivi e cambi animati. Il catalogo passa a sei sedute." },
      { id: "s5", time: "16:06", who: "both", title: "Online", text: "Decidiamo il dominio e l'agente pubblica il configuratore." },
      { id: "s6", time: "16:22", who: "human", title: "La prova in AR", text: "Mettiamo una seduta nella stanza: è più grande del vero. Confrontiamo le misure con la scheda tecnica e le facciamo correggere." },
      { id: "s7", time: "17:01", who: "both", title: "Anche su Chrome per iPhone", text: "Notiamo che su iPhone l'AR si apre solo da Safari. L'agente prepara il modello sul server e ora funziona da ogni browser." },
      { id: "s8", time: "8/10 08:29", who: "human", title: "I tessuti veri", text: "Cambiando rivestimento sembra tutto uguale. Scegliamo di usare le foto e i codici colore reali di Quinti." },
      { id: "s9", time: "16:05", who: "human", title: "Il nostro occhio", text: "Logo, icone e ordine della home secondo i principi di UX: le ultime rifiniture le decidiamo noi, una per una." },
    ],
  },
  tools: {
    eyebrow: "Per chi vende arredo",
    title: "Cosa ottiene la tua azienda",
    text: "Lo stesso configuratore, con il tuo catalogo e il tuo marchio.",
    items: [
      { id: "t-file", title: "Dai file che hai già", text: "Partiamo dai modelli OBJ, FBX o DWG e dalle schede tecniche che usi oggi." },
      { id: "t-marchio", title: "Il tuo marchio", text: "Colori, logo e caratteri sono i tuoi: il configuratore è white-label." },
      { id: "t-catalogo", title: "Il catalogo è un dato", text: "Prodotti, opzioni e regole stanno in un catalogo: un prodotto nuovo si aggiunge senza riscrivere il configuratore." },
      { id: "t-tessuti", title: "I tuoi rivestimenti", text: "Le foto e i codici dei tuoi tessuti, direttamente sul modello 3D." },
      { id: "t-link", title: "Un link per ogni configurazione", text: "Si condivide con i rivenditori, si stampa in PDF, si riapre identica." },
      { id: "t-ar", title: "Realtà aumentata senza app", text: "Il cliente vede la seduta nella sua stanza, in scala reale, da iPhone o Android." },
    ],
  },
  cta: {
    id: "per-te",
    eyebrow: "Per la tua azienda di arredo",
    title: "Hai un catalogo? Lo rendiamo configurabile",
    text: "Lo stesso modo di lavorare, sui tuoi prodotti:",
    deliverables: [
      "un primo configuratore funzionante in pochi giorni, non in mesi",
      "le scelte di design e di prodotto fatte da persone",
      "online, con il tuo marchio, pronto da far crescere",
    ],
    callLabel: "Prenota una video call",
    formTitle: "Oppure raccontaci la tua idea",
    formText: "Scrivici cosa hai in mente: ti risponderemo entro 24 ore.",
    origin: "lab-configuratore-sedute",
    interests: ["Configuratore 3D per il catalogo", "Prototipo rapido", "Agenti AI", "Consulenza AI"],
  },
};

export default configuratoreSedute;
