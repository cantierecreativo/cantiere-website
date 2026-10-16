// Sostituisce next/image con un <img>; layout="fill" (API legacy) e fill riempiono il contenitore.
export function imgStyle({ layout, fill, objectFit, objectPosition }) {
  if (layout !== "fill" && !fill) return undefined;
  return { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit, objectPosition };
}

export default function Image({
  src,
  alt = "",
  width,
  height,
  layout,
  fill,
  objectFit,
  objectPosition,
  priority,
  quality,
  placeholder,
  blurDataURL,
  loader,
  unoptimized,
  style,
  ...rest
}) {
  const fillStyle = imgStyle({ layout, fill, objectFit, objectPosition });
  return (
    <img
      src={typeof src === "object" ? src.src : src}
      alt={alt}
      width={fillStyle ? undefined : width}
      height={fillStyle ? undefined : height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      style={fillStyle || style ? { ...fillStyle, ...style } : undefined}
      {...rest}
    />
  );
}
