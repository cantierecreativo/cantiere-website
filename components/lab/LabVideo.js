import { useEffect, useRef, useState } from "react";
import t from "lib/locales";

// Video in loop con pausa (WCAG 2.2.2): non parte da solo se l'utente chiede di ridurre il movimento.
export default function LabVideo({ media, locale = "it", className = "" }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) {
      video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }, []);

  function toggle() {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setPlaying(false);
    }
  }

  return (
    <div className="relative">
      <video
        ref={ref}
        className={className}
        poster={media.poster}
        width={media.width}
        height={media.height}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={media.alt}
      >
        <source src={media.video} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={t(playing ? "lab_video_pause_label" : "lab_video_play_label", locale)}
        className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white duration-200 hover:bg-black/80"
      >
        {t(playing ? "lab_video_pause" : "lab_video_play", locale)}
      </button>
    </div>
  );
}
