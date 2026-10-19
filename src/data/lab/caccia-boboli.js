// Contenuti statici della pagina Lab della caccia ai dettagli nel Giardino di Boboli.
// Fonti: repo cantierecreativo/boboli-caccia (git log 12–15/10/2026, context/00-brief.md, 05-decisions.md).

// Indirizzo pubblico del gioco: tutti i link della pagina passano da qui.
export const CACCIA_BOBOLI_URL = "https://boboli-kids.cantierecreativo.net";

const cacciaBoboli = {
  model: "lab_project",
  id: "lab-caccia-boboli",
  slug: "caccia-ai-dettagli-boboli",
  title: "Caccia ai dettagli: la mappa di Boboli diventa un gioco per bambini",
  shortTitle: "Caccia ai dettagli a Boboli",
  abstract:
    "Nella mappa illustrata del Giardino di Boboli abbiamo nascosto ventiquattro piccole scene. I bambini le cercano, rispondono a un quiz e completano un puzzle. Un agente AI ha scritto il codice; il gioco l'abbiamo pensato noi, per chi ha dai 6 ai 10 anni.",
  previewText:
    "Un progetto del Lab di Cantiere Creativo: un gioco per bambini dai 6 ai 10 anni sulla mappa illustrata del Giardino di Boboli, con tre missioni, quiz e puzzle.",
  status: "Online",
  dataDate: "2026-10-15",
  atlasUrl: CACCIA_BOBOLI_URL,
  about: {
    "@type": "Park",
    name: "Giardino di Boboli",
    address: { "@type": "PostalAddress", addressLocality: "Firenze", addressCountry: "IT" },
  },
  media: {
    poster: "/lab/caccia-boboli/caccia-dettagli.jpg",
    video: "/lab/caccia-boboli/caccia-dettagli.mp4",
    width: 1780,
    height: 1108,
    alt: "La caccia ai dettagli: Bobo presenta le tre missioni, la mappa si ingrandisce sul gatto che dorme sul tetto della Limonaia, poi il quiz e il primo pezzo del puzzle",
    caption: "Il gioco online: il primo dettaglio trovato e il suo quiz",
  },
  seo: {
    title: "Come abbiamo trasformato la mappa di Boboli in un gioco per bambini con l'AI",
    description:
      "Un agente AI, la mappa illustrata del Giardino di Boboli e le scelte del nostro team: come Cantiere Creativo ha costruito un gioco per bambini dai 6 ai 10 anni.",
    image: "/lab/caccia-boboli/og-caccia-boboli.jpg",
  },
  heroActions: {
    primary: { label: "Gioca" },
    secondary: { label: "Parliamo del tuo progetto" },
  },
  facts: {
    eyebrow: "Il progetto",
    title: "Il gioco in tre numeri",
    // Fonti: 00-brief.md (24 scene in 3 missioni, 6–10 anni, durata stimata 15–25 minuti), D-11, D-13, D-17.
    items: [
      { id: "f-scene", number: "24", label: "sorprese nascoste nella mappa, in tre missioni" },
      { id: "f-eta", number: "6–10", label: "anni: il gioco è pensato per chi legge da poco" },
      { id: "f-minuti", number: "15–25", label: "minuti stimati per le tre missioni, senza cronometro" },
    ],
    note: "Un progetto del nostro Lab, non commissionato dalle Gallerie degli Uffizi: un esperimento sulla mappa del Giardino di Boboli che abbiamo disegnato per loro.",
  },
  chapters: {
    eyebrow: "Come l'abbiamo fatto",
    title: "Un gioco che si capisce in pochi secondi",
    items: [
      {
        id: "c-missioni",
        title: "Da trenta secondi a tre missioni",
        text: "La prima versione era una lista di dodici dettagli da trovare: si finiva in mezzo minuto. Abbiamo chiesto una storia: tre missioni con Bobo, lo scoiattolo esploratore, otto sorprese ciascuna e un puzzle da completare.",
        points: [
          "24 sorprese, una missione dopo l'altra",
          "dopo ogni scoperta, un quiz a tre risposte illustrate",
          "alla fine un attestato da scaricare e stampare",
        ],
        image: {
          src: "/lab/caccia-boboli/missioni.jpg",
          alt: "La copertina del gioco: Bobo, lo scoiattolo con la lente, spiega i tre passi; sotto le tre missioni, la prima aperta e le altre due chiuse, e il pulsante «Gioca!»",
          width: 1200,
          height: 1000,
        },
      },
      {
        id: "c-senza-ansia",
        title: "Niente ansia, niente penalità",
        text: "A sei anni il cronometro mette ansia, e chi resta bloccato smette di giocare. Così niente tempo, aiuti subito disponibili e il gioco del «fuochino» per orientarsi. Il pezzo del puzzle arriva anche sbagliando il quiz, con la spiegazione.",
        points: [
          "indizi di dodici parole al massimo, testo grande e bersagli larghi",
          "suoni spenti all'inizio, si accendono con un tasto",
          "accessibile secondo le WCAG 2.2 AA",
        ],
        image: {
          src: "/lab/caccia-boboli/quiz.jpg",
          alt: "La cartolina del primo dettaglio trovato, il gatto dormiglione sulla Limonaia: a sinistra il primo pezzo del puzzle, a destra il quiz con la risposta giusta, «I limoni», e la spiegazione",
          width: 1200,
          height: 1000,
        },
      },
      {
        id: "c-mappa",
        title: "La mappa, nitida a ogni zoom",
        text: "La mappa viene dal file vettoriale originale e si ridisegna a ogni livello di ingrandimento: resta nitida anche quando cerchi un gatto sul tetto della serra. Abbiamo tolto la legenda e i percorsi stampati, che nel gioco non servono e confondono i bambini.",
        points: [
          "si gioca da telefono, tablet o computer",
          "il progresso resta nel browser: niente account",
          "l'attestato si prepara nel browser, senza inviare dati",
        ],
        image: {
          src: "/lab/caccia-boboli/indizio.jpg",
          alt: "La mappa ingrandita sul tetto della Limonaia, dove dorme un gatto arancione; a destra l'indizio «Un gatto dorme al sole sul tetto della serra» e l'indicatore «Fuoco!»",
          width: 1200,
          height: 1000,
        },
      },
    ],
  },
  story: {
    eyebrow: "Persone e AI",
    title: "Noi giochiamo, l'agente corregge",
    text: "L'agente scrive il codice e disegna le scene. Noi giochiamo, guardiamo dove ci si blocca e decidiamo cosa cambiare.",
    legend: { human: "Noi", ai: "Agente AI", both: "Noi + agente" },
    // Date reali dei passaggi, non mostrate in pagina: s1–s5 12/10, s6–s8 13/10, s9 13–15/10.
    steps: [
      { id: "s1", who: "both", title: "La prima versione", text: "Chiediamo un gioco di osservazione sulla mappa illustrata. L'agente nasconde dodici piccole scene e scrive il gioco." },
      { id: "s2", who: "human", title: "Per i bambini", text: "Scegliamo il pubblico: bambini dai 6 ai 10 anni. Indizi brevi, testo grande, bersagli larghi." },
      { id: "s3", who: "human", title: "Niente cronometro", text: "Togliamo il tempo e rendiamo gli aiuti subito disponibili: per i più piccoli il cronometro mette ansia." },
      { id: "s4", who: "human", title: "Una storia e un traguardo", text: "Il gioco dura trenta secondi. Chiediamo tre missioni con una storia, otto sorprese ciascuna e un puzzle da completare." },
      { id: "s5", who: "both", title: "Quiz senza penalità", text: "Dopo ogni scoperta un mini-quiz. Decidiamo che il pezzo del puzzle arriva anche con la risposta sbagliata, spiegata." },
      { id: "s6", who: "human", title: "Più vivo", text: "Chiediamo un riscontro più vivo nel quiz e una copertina in cui la mappa non copra le missioni." },
      { id: "s7", who: "both", title: "Un attestato, senza dati", text: "Alla fine un attestato con il nome del bambino: lo disegna il browser e si scarica, senza email né invio di dati." },
      { id: "s8", who: "human", title: "La mappa pulita", text: "Togliamo dalla mappa legenda e percorsi stampati: confondono chi cerca. L'agente rigenera la mappa dal file vettoriale." },
      { id: "s9", who: "both", title: "Online", text: "Anteprima per la condivisione, statistiche solo con il consenso, dominio di Cantiere Creativo. Pubblichiamo." },
    ],
  },
  tools: {
    eyebrow: "Per musei, parchi e scuole",
    title: "Cosa può fare per il tuo luogo",
    text: "Lo stesso gioco, sulla tua mappa e con le tue storie.",
    items: [
      { id: "t-mappa", title: "La tua mappa, giocabile", text: "Partiamo dalla mappa illustrata o dalla pianta che hai già, nitida a ogni zoom." },
      { id: "t-missioni", title: "Missioni su misura", text: "Personaggi, storie e curiosità del tuo luogo, scritti con te." },
      { id: "t-bambini", title: "Pensato per i bambini", text: "Testi brevi, niente tempo, aiuti sempre pronti: si gioca da soli o con un adulto." },
      { id: "t-attestato", title: "Un ricordo da portare a casa", text: "Attestato e puzzle da scaricare e stampare, senza raccogliere dati." },
      { id: "t-ovunque", title: "Da telefono o computer", text: "In visita o a casa, senza app da installare." },
      { id: "t-accessibile", title: "Accessibile", text: "Secondo le WCAG 2.2 AA, con suoni facoltativi e movimento ridotto." },
    ],
  },
  cta: {
    id: "per-te",
    eyebrow: "Per il tuo museo, il tuo parco, la tua scuola",
    title: "Hai una mappa? La facciamo diventare un gioco",
    text: "Lo stesso modo di lavorare, sul tuo luogo:",
    deliverables: [
      "un prototipo funzionante in pochi giorni, non in mesi",
      "le scelte di gioco e di contenuto fatte da persone",
      "online, misurabile, pronto da far crescere",
    ],
    callLabel: "Prenota una video call",
    formTitle: "Oppure raccontaci la tua idea",
    formText: "Scrivici cosa hai in mente: ti risponderemo entro 24 ore.",
    origin: "lab-caccia-boboli",
    interests: ["Gioco o esperienza per bambini", "Mappa interattiva o guida", "Prototipo rapido", "Consulenza AI"],
  },
};

export default cacciaBoboli;
