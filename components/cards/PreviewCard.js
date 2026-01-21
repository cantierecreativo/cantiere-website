import { Image as DatoImage } from "react-datocms";
import Button from "components/blocks/Button";
import { cleanFileName } from "lib/utils";

export default function PreviewCard({ record }) {
  const { title, previewImage, subtitle } = record;
  return (
    <>
      <DatoImage
        className="mb-3 rounded-3xl"
        data={previewImage.responsiveImage}
        alt={
          previewImage.responsiveImage.alt ||
          cleanFileName(previewImage.filename)
        }
        title={
          previewImage.responsiveImage.title ||
          cleanFileName(previewImage.filename)
        }
      />
      {subtitle && <div className="text-gray-dark tex-sm">{subtitle}</div>}
      {title && <h2 className="font-bold text-xl">{title}</h2>}
      <div className="inline-block mt-4">
        <Button bg="blueWhite" />
      </div>
    </>
  );
}
