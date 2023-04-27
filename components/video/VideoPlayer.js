import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function VideoPlayer({ record }) {
  // return console.log("record:", record);
  const mp4Url = record.internalVideo.video?.mp4Url
    ? record.internalVideo.video?.mp4Url
    : record.internalVideo.url;
  return (
    <ReactPlayer
      fluid={true}
      playing={false}
      autoPlay={false}
      width="100%"
      height="100%"
      light={record.poster?.responsiveImage.src}
      lightUrl={record.poster?.responsiveImage.src}
      url={mp4Url}
      controls={true}
    />
  );
}
