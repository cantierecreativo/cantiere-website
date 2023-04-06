import VideoPlayer from "components/video/VideoPlayer";
import VideoEmbedded from "components/video/VideoEmbedded";

export default function VideoBlock({ locale, record }) {
  return (
    <>
      <div className="aspect-video">
        {record.externalVideo?.url && (
          <VideoEmbedded record={record} video={record.externalVideo} />
        )}
        {record.internalVideo?.url && <VideoPlayer record={record} />}
      </div>
    </>
  );
}
