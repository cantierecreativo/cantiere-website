import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

import React from "react";
// import ReactPlayer from "react-player/youtube";

export default function VideoPlayer({ record }) {
  const mp4Url = record.internalVideo.video?.mp4Url
    ? record.internalVideo.video?.mp4Url
    : record.internalVideo.url;
  return (
    <>
      <ReactPlayer
        playing={false}
        loop={true}
        playIcon={true}
        width="100%"
        height="100%"
        light={record.poster?.responsiveImage.src}
        lightUrl={record.poster?.responsiveImage.src}
        url={mp4Url}
        controls={true}
      />
    </>
  );
}
