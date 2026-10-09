// English content of the Lab page for the 3D seating configurator. Same facts and sources as the Italian version.
import { CONFIGURATOR_URL } from "./configuratore-sedute";

const seatingConfigurator = {
  model: "lab_project",
  id: "lab-configuratore-sedute",
  slug: "3d-seating-configurator",
  title: "The 3D configurator for Quinti seating, online in a day",
  shortTitle: "3D seating configurator",
  abstract:
    "An AI agent turned CAD files into a configurator in 75 minutes. We tested it, corrected it and refined it until it was beautiful and reliable. We can do the same with your catalogue.",
  previewText:
    "The 3D configurator, with augmented reality, for Quinti seating: built with AI from the manufacturer's CAD files and spec sheets.",
  status: "Online",
  dataDate: "2026-10-08",
  atlasUrl: CONFIGURATOR_URL,
  about: { "@type": "Organization", name: "Quinti Sedute", url: "https://quinti.com" },
  media: {
    poster: "/lab/configuratore-sedute/configuratore-3d.jpg",
    video: "/lab/configuratore-sedute/configuratore-3d.mp4",
    width: 1780,
    height: 1108,
    alt: "The Deep Executive configurator: the chair changes upholstery and colour, then turns to the side",
    caption: "The configurator online: the Deep Executive changes upholstery",
  },
  seo: {
    title: "How we built a 3D seating configurator with AI",
    description:
      "An AI agent, Quinti's CAD files and our team's choices: how Cantiere Creativo built a 3D configurator with augmented reality in two days.",
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
      { id: "f-minuti", number: "75 minutes", label: "from brief to the first chair configurable in 3D" },
      { id: "f-modelli", number: "18", label: "3D models made from CAD files, each under half a megabyte" },
      { id: "f-scelte", number: "34", label: "choices made by our team after the first version" },
    ],
  },
  chapters: {
    eyebrow: "The Lab method",
    title: "Three sentences, three proofs",
    items: [
      {
        id: "c-veloci",
        line: "AI makes us fast.",
        title: "From CAD files to the browser in 75 minutes",
        text: "Quinti publishes spec sheets and 3D models of its products. The agent (Claude Code) read them, turned them into lightweight models for the web and wrote the catalogue rules: which options exist and which go together.",
        points: [
          "6 products and 18 3D variants, from the manufacturer's OBJ and FBX files",
          "lightweight models that load on a phone too",
          "combinations the spec sheet rules out cannot be chosen",
        ],
        image: {
          src: "/lab/configuratore-sedute/prodotti.jpg",
          alt: "The six Quinti chairs of the configurator in 3D: Deep Executive, Chance Net, Hanami, Club, Amelie Lounge and Olga",
          width: 1200,
          height: 1000,
        },
      },
      {
        id: "c-diversi",
        line: "Taste sets us apart.",
        title: "What matters shows up when you try it",
        text: "AI does what you ask. Noticing that something is off, and deciding how it should be, is still our job. Trying the configurator we noticed that all the upholsteries looked the same: now every fabric has its own photos and real colours.",
        points: [
          "268 real colours, with photos and codes from the Quinti catalogue",
          "34 choices by our team after the first version, from the home page animation to the icons",
          "the home page order reviewed against UX principles",
        ],
        image: {
          src: "/lab/configuratore-sedute/prima-dopo-en.jpg",
          alt: "The same Club armchair twice: on the left with a flat colour, on the right with the photo of the bouclé fabric, showing its texture",
          width: 1200,
          height: 1000,
        },
      },
      {
        id: "c-affidabili",
        line: "Experience makes us reliable.",
        title: "It works off the screen too",
        text: "In augmented reality the chair appears in the room at real scale, so the measurements have to be right. We checked every model against the spec sheet: in the file the Amelie Lounge was 96 cm tall, the real one is 81.",
        points: [
          "augmented reality on iPhone and Android with no app, Chrome on iPhone included",
          "real measurements on the model, one tap away",
          "usable with a keyboard and a screen reader, to WCAG 2.2 AA",
        ],
        image: {
          src: "/lab/configuratore-sedute/telefono.jpg",
          alt: "The configurator on a smartphone: the Amelie Lounge in green fabric with its real measurements, seat 36–42 cm and height 75–81 cm",
          width: 1200,
          height: 1000,
        },
      },
    ],
  },
  story: {
    eyebrow: "People and AI",
    title: "Two days, step by step",
    text: "The agent writes the code and converts the models. We try it on a phone, in augmented reality and with the real catalogue, and decide what to change.",
    legend: { human: "Us", ai: "AI agent", both: "Us + agent" },
    steps: [
      { id: "s1", time: "7/10 11:15", who: "human", title: "The brief", text: "We ask for a 3D configurator to offer furniture companies, on Quinti's real catalogue and with augmented reality. No photos: 3D." },
      { id: "s2", time: "11:40", who: "ai", title: "From CAD files to the web", text: "The agent reads the spec sheet, converts the manufacturer's 3D models into lightweight files for the browser and writes the catalogue rules." },
      { id: "s3", time: "12:28", who: "ai", title: "The first version", text: "The Deep Executive can be configured: backrest, armrests, upholstery, base and castors." },
      { id: "s4", time: "13:20", who: "human", title: "More, and better looking", text: "We ask for more products, visual controls and animated changes. The catalogue grows to six chairs." },
      { id: "s5", time: "16:06", who: "both", title: "Online", text: "We pick the domain and the agent publishes the configurator." },
      { id: "s6", time: "16:22", who: "human", title: "The AR test", text: "We place a chair in the room: it is bigger than the real one. We check the measurements against the spec sheet and have them corrected." },
      { id: "s7", time: "17:01", who: "both", title: "Chrome on iPhone too", text: "We notice that on iPhone AR only opens from Safari. The agent builds the model on the server and now it works from every browser." },
      { id: "s8", time: "8/10 08:29", who: "human", title: "The real fabrics", text: "Changing upholstery, everything looks the same. We choose to use Quinti's real photos and colour codes." },
      { id: "s9", time: "16:05", who: "human", title: "Our eye", text: "Logo, icons and the order of the home page by UX principles: we decide the final touches ourselves, one by one." },
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
