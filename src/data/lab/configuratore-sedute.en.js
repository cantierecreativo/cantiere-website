// English content of the Lab page for the 3D seating configurator. Same facts and sources as the Italian version.
import { CONFIGURATOR_URL } from "./configuratore-sedute";

const seatingConfigurator = {
  model: "lab_project",
  id: "lab-configuratore-sedute",
  slug: "3d-seating-configurator",
  title: "A 3D seating configurator, with real fabrics and the right measurements",
  shortTitle: "3D seating configurator",
  abstract:
    "An AI agent read the CAD files and wrote the code. We tested it on phones and in augmented reality, and decided what to change: 34 choices, from real fabrics to the right measurements. We can do the same with your catalogue.",
  previewText:
    "A Cantiere Creativo Lab project: the 3D configurator, with augmented reality, for a seating catalogue, built with AI from the 3D models and spec sheets published by the manufacturer.",
  status: "Online",
  dataDate: "2026-10-08",
  atlasUrl: CONFIGURATOR_URL,
  media: {
    poster: "/lab/configuratore-sedute/configuratore-3d.jpg",
    video: "/lab/configuratore-sedute/configuratore-3d.mp4",
    width: 1780,
    height: 1108,
    alt: "The executive chair configurator: the chair changes upholstery and colour, then turns to the side",
    caption: "The configurator online: the executive chair changes upholstery",
  },
  seo: {
    title: "How we built a 3D seating configurator with AI",
    description:
      "An AI agent, a seating manufacturer's CAD files and 34 choices by our team: how Cantiere Creativo built a 3D configurator with augmented reality.",
    image: "/lab/configuratore-sedute/og-seating-configurator-en.jpg",
  },
  heroActions: {
    primary: { label: "Try the configurator" },
    secondary: { label: "Let's talk about your project" },
  },
  facts: {
    eyebrow: "The project",
    title: "The configurator in three numbers",
    items: [
      { id: "f-scelte", number: "34", label: "choices made by our team after the agent's first version" },
      { id: "f-colori", number: "268", label: "real colours, with photos and codes from the manufacturer's catalogue" },
      { id: "f-modelli", number: "18", label: "3D models made from CAD files, each under half a megabyte" },
    ],
  },
  chapters: {
    eyebrow: "How we did it",
    title: "Built with AI, refined by us, reliable to use",
    items: [
      {
        id: "c-veloci",
        title: "From the manufacturer's CAD files to the browser",
        text: "The manufacturer publishes spec sheets and 3D models of its products. The agent (Claude Code) read them, turned them into lightweight models for the web and wrote the catalogue rules: which options exist and which go together.",
        points: [
          "6 products and 18 3D variants, from the manufacturer's OBJ and FBX files",
          "lightweight models that load on a phone too",
          "combinations the spec sheet rules out cannot be chosen",
        ],
        image: {
          src: "/lab/configuratore-sedute/prodotti.jpg",
          alt: "The six chairs of the configurator in 3D: three office chairs, an armchair, a swivel lounge chair and a chair",
          width: 1200,
          height: 1000,
        },
      },
      {
        id: "c-diversi",
        title: "What matters shows up when you try it",
        text: "AI does what you ask. Noticing that something is off, and deciding how it should be, is still our job. Trying the configurator we noticed that all the upholsteries looked the same: now every fabric has its own photos and real colours.",
        points: [
          "268 real colours, with photos and codes from the manufacturer's catalogue",
          "34 choices by our team after the first version, from the home page animation to the icons",
          "the home page order reviewed against UX principles",
        ],
        image: {
          src: "/lab/configuratore-sedute/prima-dopo-en.jpg",
          alt: "The same armchair twice: on the left with a flat colour, on the right with the photo of the bouclé fabric, showing its texture",
          width: 1200,
          height: 1000,
        },
      },
      {
        id: "c-affidabili",
        title: "Try it where it will stand",
        text: "In augmented reality the chair appears in the room at real scale, so the measurements have to be right. We checked every model against the spec sheet: in the file the lounge chair was 96 cm tall, the real one is 81.",
        points: [
          "augmented reality on iPhone and Android with no app, Chrome on iPhone included",
          "real measurements on the model, one tap away",
          "usable with a keyboard and a screen reader, to WCAG 2.2 AA",
        ],
        image: {
          src: "/lab/configuratore-sedute/realta-aumentata.jpg",
          alt: "Smartphone screenshot in augmented reality: a chair in ochre bouclé fabric standing on the wooden floor of a real room, at real scale",
          width: 1200,
          height: 1000,
        },
      },
    ],
  },
  story: {
    eyebrow: "People and AI",
    title: "The agent writes the code, we try the chair in the living room",
    text: "The agent writes the code and converts the models. We try it on a phone, in augmented reality and with the real catalogue, and decide what to change.",
    legend: { human: "Us", ai: "AI agent", both: "Us + agent" },
    // Real step times (7-8/10/2026), not shown on the page: s1 7/10 11:15, s2 11:40, s3 12:28, s4 13:20, s5 16:06, s6 16:22, s7 17:01, s8 8/10 08:29, s9 16:05.
    steps: [
      { id: "s1", who: "human", title: "The brief", text: "We ask for a 3D configurator to offer furniture companies, on a seating manufacturer's real catalogue and with augmented reality. No photos: 3D." },
      { id: "s2", who: "ai", title: "From CAD files to the web", text: "The agent reads the spec sheet, converts the manufacturer's 3D models into lightweight files for the browser and writes the catalogue rules." },
      { id: "s3", who: "ai", title: "The first version", text: "The executive chair can be configured: backrest, armrests, upholstery, base and castors." },
      { id: "s4", who: "human", title: "More, and better looking", text: "We ask for more products, visual controls and animated changes. The catalogue grows to six chairs." },
      { id: "s5", who: "both", title: "Online", text: "We pick the domain and the agent publishes the configurator." },
      { id: "s6", who: "human", title: "The AR test", text: "We place a chair in the room: it is bigger than the real one. We check the measurements against the spec sheet and have them corrected." },
      { id: "s7", who: "both", title: "Chrome on iPhone too", text: "We notice that on iPhone AR only opens from Safari. The agent builds the model on the server and now it works from every browser." },
      { id: "s8", who: "human", title: "The real fabrics", text: "Changing upholstery, everything looks the same. We choose to use the manufacturer's real photos and colour codes." },
      { id: "s9", who: "human", title: "Our eye", text: "Logo, icons and the order of the home page by UX principles: we decide the final touches ourselves, one by one." },
    ],
  },
  tools: {
    eyebrow: "For furniture brands",
    title: "What your company gets",
    text: "The same configurator, with your catalogue and your brand.",
    items: [
      { id: "t-file", title: "From the files you already have", text: "We start from the OBJ, FBX or DWG models and the spec sheets you use today." },
      { id: "t-marchio", title: "Your brand", text: "Colours, logo and typefaces are yours: the configurator is white-label." },
      { id: "t-catalogo", title: "The catalogue is data", text: "Products, options and rules live in a catalogue: a new product is added without rewriting the configurator." },
      { id: "t-tessuti", title: "Your upholsteries", text: "The photos and codes of your fabrics, right on the 3D model." },
      { id: "t-link", title: "A link for every configuration", text: "Share it with dealers, print it as a PDF, reopen it exactly as it was." },
      { id: "t-ar", title: "Augmented reality, no app", text: "Customers see the chair in their room, at real scale, from iPhone or Android." },
    ],
  },
  cta: {
    id: "per-te",
    eyebrow: "For your furniture company",
    title: "Got a catalogue? We'll make it configurable",
    text: "The same way of working, on your products:",
    deliverables: [
      "a first working configurator in days, not months",
      "design and product choices made by people",
      "online, with your brand, ready to grow",
    ],
    callLabel: "Book a video call",
    formTitle: "Or tell us about your idea",
    formText: "Tell us what you have in mind: we'll get back to you within 24 hours.",
    origin: "lab-configuratore-sedute",
    interests: ["3D configurator for a catalogue", "Rapid prototype", "AI agents", "AI consulting"],
  },
};

export default seatingConfigurator;
