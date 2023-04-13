import { Image as DatoImage } from "react-datocms";

export default function ImageBlock({ record }) {
  return (
    <>
      <div className="container">
        <DatoImage
          className=""
          data={record.image.responsiveImage}
          alt={record.image.responsiveImage.alt}
          title={record.image.responsiveImage.title}
          layout="responsive"
        />
      </div>
    </>
  );
}
