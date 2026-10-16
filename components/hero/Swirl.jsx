// Il ricciolo rosa del sito (era /icons/heroRight.svg): si disegna all'apertura e si ferma, intero.
const PATH = "M67.02,551.39c-11.51,133.05,33.32,265.21,101.48,380.96,83.42,141.67,275.12,301.79,431.37,212.09,192.52-110.52,169.73-382.09,107.82-578.25-18.02-57.1-44.32-113.2-85.38-156.35-41.06-43.15-98.62-71.88-154.43-66.34-71.44,7.09-128.2,72.25-136.67,146.77-8.46,74.52,27.31,153.41,84.23,203.61,70.41,62.1,182.82,92.2,266.13,58.93,76.49-36.36,130.67-73.01,168.05-125.95,50.4-71.38,62.56-163.79,70.44-251.95,13.48-150.82,106.58-276.65,247.61-312.91";

export default function Swirl({ className = "", style }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="-45 -45 1320 1322" className={className} style={style}>
      <path
        d={PATH}
        pathLength="1"
        fill="none"
        stroke="#cc82ff"
        strokeWidth="82.76"
        strokeLinecap="round"
        className="swirl-draw"
      />
    </svg>
  );
}
