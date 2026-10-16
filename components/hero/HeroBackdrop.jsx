// Sfondo delle hero: il blu del sito con tre bagliori che si spostano e cambiano lentamente.
// Si muovono solo con transform (niente ridisegno del gradiente). Ogni colore tiene il testo
// bianco sopra 4.5:1: #6766D9 4.69, #7A5CE6 4.67, #2f2ed0 8.67. Fermo con riduci movimento.
export default function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-20 overflow-hidden bg-[#3938E0]">
      <div className="hero-glow-a absolute -left-[25%] -top-[45%] h-[130%] w-[85%] bg-[radial-gradient(closest-side,_#6766D9,_transparent)]" />
      <div className="hero-glow-b absolute -right-[30%] top-[5%] h-[120%] w-[75%] bg-[radial-gradient(closest-side,_#7A5CE6,_transparent)] opacity-80" />
      <div className="hero-glow-c absolute bottom-[-50%] left-[20%] h-[100%] w-[70%] bg-[radial-gradient(closest-side,_#2f2ed0,_transparent)]" />
    </div>
  );
}
