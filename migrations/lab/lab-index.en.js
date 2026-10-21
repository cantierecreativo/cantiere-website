// English content of the Lab index page.
const labIndexEn = {
  model: "lab_index",
  id: "lab-index",
  slug: "ai-lab",
  menuLabel: "AI Lab",
  title: "AI makes us fast. Taste makes us different. Experience makes us reliable.",
  // Label at the top of the H1: carries the "AI Lab" keyword without touching the three lines.
  eyebrow: "Cantiere Creativo AI Lab",
  heroLines: [
    { id: "h1", text: "AI makes us fast." },
    { id: "h2", text: "Taste makes us different." },
    { id: "h3", text: "Experience makes us reliable.", accent: true },
  ],
  abstract:
    "We use agents and AI to build digital products. Then we add what AI lacks: an eye for what is beautiful and judgement on what is needed. The Lab collects the projects built this way.",
  heroActions: {
    primary: { label: "See the projects", href: "#projects" },
    secondary: { label: "Book a video call" },
  },
  seo: {
    title: "AI Lab: digital products built with AI | Cantiere Creativo",
    description:
      "AI Lab is Cantiere Creativo's lab: we experiment with AI to build digital products, with our team in creative and technical control.",
    image: "/lab/og-lab-en.jpg",
  },
  manifesto: {
    eyebrow: "How we work",
    title: "No autopilot: how we work with AI",
    items: [
      {
        id: "mf-ai",
        title: "AI at every level",
        text: "Agents and artificial intelligence work with us across the whole project: ideas, design, code, content.",
      },
      {
        id: "mf-gusto",
        title: "Choices made by people",
        text: "We decide what is beautiful and what makes sense to put in front of visitors. Everything else goes.",
      },
      {
        id: "mf-prova",
        title: "Real products, online",
        text: "No promises: every Lab project can be opened and tried. You be the judge.",
      },
    ],
  },
  projects: {
    id: "projects",
    eyebrow: "The projects",
    title: "The proof: the projects we built with AI",
    text: "Every Lab project starts the same way: fast thanks to AI, refined by our choices.",
  },
  services: {
    eyebrow: "What we do for you",
    title: "Putting AI to work for you too",
    // Links hidden until the three service pages are ready.
    showLinks: false,
    items: [
      {
        id: "srv-agenti",
        title: "Agents for your business",
        text: "We build AI agents that work inside your tools: they answer, fill in, sort requests and update content. You set the rules, we make them reliable.",
        href: "/tecnologie/intelligenza-artificiale",
        linkLabel: "See how",
      },
      {
        id: "srv-prototipi",
        title: "Rapid prototypes, then refined",
        text: "We turn your idea into a working prototype in a few days. You try it, we fix it together and refine it into the final product.",
        href: "/soluzioni/blueprint",
        linkLabel: "See the method",
      },
      {
        id: "srv-consulenza",
        title: "AI consulting",
        text: "We help you work out where AI really helps in your work: team training, choice of tools, usage rules in line with the AI Act.",
        call: true,
        linkLabel: "Let's talk",
      },
    ],
  },
  cta: {
    title: "Like the way we work?",
    text: "The same method, on your project. Tell us what you have in mind.",
    callLabel: "Book a video call",
  },
};

export default labIndexEn;
