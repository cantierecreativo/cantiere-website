// English content of the Lab index page.
const labIndexEn = {
  model: "lab_index",
  id: "lab-index",
  slug: "lab",
  title: "AI makes us fast. Taste makes us different. Experience makes us reliable.",
  heroLines: [
    { id: "h1", text: "AI makes us fast." },
    { id: "h2", text: "Taste makes us different." },
    { id: "h3", text: "Experience makes us reliable.", accent: true },
  ],
  abstract:
    "We use agents and AI at every level. Then we add what AI lacks: an eye for what is beautiful and judgement on what really matters. The Lab collects the products that prove it.",
  heroActions: {
    primary: { label: "See the projects", href: "#projects" },
    secondary: { label: "Book a video call" },
  },
  seo: {
    title: "Cantiere Creativo Lab: AI makes us fast, taste makes us different",
    description:
      "We use agents and AI at every level, then add an eye for what is beautiful and useful. The Lab collects the products that prove it.",
    image: "/lab/atlante-uffizi/og-uffizi-atlas-en.jpg",
  },
  manifesto: {
    eyebrow: "How we work",
    title: "No autopilot.",
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
    title: "The proof is what we build",
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
    text: "Your project could be the next one in the Lab. Tell us what you have in mind.",
    callLabel: "Book a video call",
  },
};

export default labIndexEn;
