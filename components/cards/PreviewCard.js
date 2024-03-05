import { Image as DatoImage } from "react-datocms";
import Button from "components/blocks/Button";

export default function PreviewCard({ record }) {
  const { title, previewImage, subtitle } = record;
  return (
    <>
      <DatoImage
        className="mb-3"
        data={previewImage.responsiveImage}
        alt={previewImage.responsiveImage.alt}
        title={previewImage.responsiveImage.title}
      />
      {subtitle && <div className="text-gray-dark tex-sm">{subtitle}</div>}
      {title && <h2 className="font-bold text-xl">{title}</h2>}
      <div className="inline-block mt-4">
        <Button bg="blueWhite" />
      </div>
    </>
  );
}
