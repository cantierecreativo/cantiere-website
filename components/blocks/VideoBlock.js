import VideoPlayer from "components/video/VideoPlayer";
import VideoEmbedded from "components/video/VideoEmbedded";

export default function VideoBlock({ locale, record }) {
  return (
    <>
      <div className="container">
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-start-2 lg:col-span-10">
            <div className="aspect-video container">
              {record.externalVideo?.url && (
                <VideoEmbedded record={record} video={record.externalVideo} />
              )}
              {record.internalVideo?.url && <VideoPlayer record={record} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
