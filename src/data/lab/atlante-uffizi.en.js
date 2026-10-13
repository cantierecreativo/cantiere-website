// English content of the Lab page for the Uffizi atlas. Same facts and sources as the Italian version.
import { ATLAS_URL } from "./atlante-uffizi";

const uffiziAtlas = {
  model: "lab_project",
  id: "lab-atlante-uffizi",
  slug: "uffizi-atlas",
  title: "The 3D atlas of the Uffizi, room by room and artwork by artwork",
  shortTitle: "Uffizi atlas",
  abstract:
    "An AI agent read the catalogues and wrote the code with us. We chose what to show and, above all, how to show it. We can do it for you too.",
  previewText:
    "The 3D atlas of the Uffizi Gallery, built with AI on the public catalogues of the Italian Ministry of Culture.",
  status: "Online",
  dataDate: "2026-09-17",
  atlasUrl: ATLAS_URL,
  about: {
    "@type": "Museum",
    name: "Galleria degli Uffizi",
    address: { "@type": "PostalAddress", addressLocality: "Firenze", addressCountry: "IT" },
  },
  media: {
    poster: "/lab/atlante-uffizi/atlante-3d.jpg",
    video: "/lab/atlante-uffizi/atlante-3d.mp4",
    width: 1780,
    height: 1108,
    alt: "The 3D plan of the Uffizi second floor in the atlas: the view rotates, then separates the floors",
    caption: "The atlas online (in Italian): 3D plan of the second floor",
  },
  seo: {
    title: "How we built the 3D atlas of the Uffizi with AI",
    description:
      "One AI agent, two people and their choices: how Cantiere Creativo built the 3D atlas of the Uffizi, from public sources only.",
    image: "/lab/atlante-uffizi/og-uffizi-atlas-en.jpg",
  },
  heroActions: {
    primary: { label: "Open the atlas" },
    secondary: { label: "Let's talk about your project" },
  },
  facts: {
    eyebrow: "The project",
    title: "The atlas in three numbers",
    items: [
      { id: "f-opere", number: "1,887", label: "artworks, from public sources only" },
      { id: "f-sale", number: "91", label: "rooms and spaces to explore" },
      { id: "f-piani", number: "3", label: "floors to explore in 3D, on a phone too" },
    ],
    note: "A project from our Lab, not commissioned by the Uffizi: we used only the museum's public pages and the Ministry's catalogue.",
  },
  story: {
    eyebrow: "People and AI",
    title: "The agent executes, we decide",
    text: "Reading thousands of records and writing the code is the agent's job. Testing, correcting and choosing what to show is ours.",
    legend: { human: "Us", ai: "AI agent", both: "Us + agent" },
    // Real step times (17/09/2026), not shown on the page: s1 10:30, s2 10:40, s3 11:05, s4 11:20, s5 11:30, s6 11:50, s7 12:05, s8 14:50, s9 15:20.
    steps: [
      { id: "s1", who: "human", title: "The brief", text: "We ask for a 3D atlas of every floor and every room, with each artwork clickable and usable on a phone too." },
      { id: "s2", who: "ai", title: "The plan and the code", text: "The agent drafts the plan, reads the public sources and builds the atlas: 3D plan, rooms, artwork records." },
      { id: "s3", who: "human", title: "A plan B", text: "We ask for the atlas to work on devices that can't handle 3D as well." },
      { id: "s4", who: "ai", title: "The first version", text: "The agent publishes the first version, ready to test." },
      { id: "s5", who: "human", title: "Testing on iPad", text: "We try the atlas on a real iPad: empty rooms and glitches in the 3D. We send it back." },
      { id: "s6", who: "human", title: "Every artwork, none left out", text: "We insist on every artwork in every room. The agent rereads the museum's pages and the national catalogue." },
      { id: "s7", who: "human", title: "Public sources only", text: "The agent asks for a private inventory. Our answer: use the public sources. Where they fall short, we say so clearly." },
      { id: "s8", who: "both", title: "Open to everyone", text: "We decide to open the atlas to everyone. The agent makes it public." },
      { id: "s9", who: "human", title: "Our eye", text: "We ask the agent to tidy up the project. From here our team takes over and redesigns the interface." },
    ],
  },
  tools: {
    eyebrow: "The tools",
    title: "What we used",
    text: "Different tools, one rule: everything the AI produces goes through a person before it goes live.",
    items: [
      { id: "t-agente", title: "A coding agent", text: "Codex, an artificial intelligence agent: it plans, writes the code and checks its own work. We set the direction." },
      { id: "t-dati", title: "Public data", text: "The pages of the Uffizi website and the Ministry's national catalogue of cultural heritage. No private sources." },
      { id: "t-3d", title: "3D in the browser", text: "The plan and the rooms can be explored in 3D, with nothing to install. If a device can't handle 3D, the atlas switches to a lighter version." },
      { id: "t-test", title: "Automated checks", text: "A program opens all 1,887 records one by one, on Chrome and Safari, and tries the atlas as on an iPad." },
      { id: "t-design", title: "Team design", text: "Interface, layout and graphics are our decisions, reviewing by hand what the agent had proposed." },
      { id: "t-pubblicazione", title: "Publishing", text: "The atlas is online and every change goes live within minutes." },
    ],
  },
  cta: {
    id: "for-you",
    eyebrow: "For your company, your museum, your institution",
    title: "Got an idea? Here's how we build it",
    text: "The same way of working, on your project:",
    deliverables: [
      "a working prototype in days, not months",
      "design and content choices made by people",
      "online, measurable, ready to grow",
    ],
    callLabel: "Book a video call",
    formTitle: "Or tell us about your idea",
    formText: "Tell us what you have in mind: we'll get back to you within 24 hours.",
    origin: "lab-uffizi-atlas-en",
    interests: ["Rapid prototype", "AI agents", "AI consulting", "Atlas or map for a museum"],
  },
};

export default uffiziAtlas;
