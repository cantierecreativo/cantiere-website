import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function VideoPlayer({ record, video }) {
  return (
    <>
      <ReactPlayer
        playing={false}
        loop={true}
        width="100%"
        height="100%"
        url={video.url}
        controls={true}
      />
    </>
  );
}
