// Vetro chiaro condiviso da logo, menu e azioni: su qualunque sfondo (hero blu, foto, sezioni viola)
// il logo a colori e il testo nero restano leggibili.
export const GLASS =
  "relative isolate rounded-full shadow-[0_15px_25px_-15px_rgba(82,81,245,0.25)] after:absolute after:inset-0 after:-z-10 after:rounded-full after:bg-white/70 after:backdrop-blur-sm after:shadow-[0_0_0_1px_#fff_inset]";

// Anello di focus a due toni (nero con stacco bianco): visibile sia sul vetro chiaro sia sugli sfondi blu.
export const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white";
