import { Image as DatoImage } from "react-datocms";
import useViewportSizes from "use-viewport-sizes";

export default function VideoBg({ data, image }) {
  const [vpW] = useViewportSizes();
  return (
    <>
      {parseInt(vpW) > 1023 ? (
        <video
          aria-hidden="true"
          className="absolute h-full w-full object-cover"
          autoPlay
          muted
        >
          <source src={data.video.mp4Url} type={data.video?.mimeType} />
        </video>
      ) : (
        <div
          aria-hidden="true"
          className="image-cover absolute -z-10 h-full w-full"
        >
          <DatoImage
            className=""
            data={image.responsiveImage}
            alt={image.responsiveImage.alt}
            title={image.responsiveImage.title}
            layout="fill"
          />
        </div>
      )}
    </>
  );
}
