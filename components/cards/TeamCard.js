import { Image as DatoImage } from "react-datocms";
import ExternalLink from "components/links/ExternalLink";

export default function TeamCard({ locale, record }) {
  const { name, role, image, description, linkedinUrl, email } = record;
  return (
    <>
      <div className="md:col-span-1 lg:grid-cols-6 lg:grid">
        <div className="lg:col-start-2 lg:col-span-4 grid gap-2 content-start lg:gap-4">
          {image && (
            <DatoImage
              className=""
              data={image.responsiveImage}
              alt={image.responsiveImage.alt}
              title={image.responsiveImage.title}
              layout=""
            />
          )}
          <div className="text-gray-dark font-bold text-xs uppercase lg:text-sm pt-2">
            {role}
          </div>
          <h2 className="text-blue text-xl lg:text-2xl">{name}</h2>
          <div className="custom-border-bottom after:hidden pb-2 mb-1"></div>
          <h3 className="">{description}</h3>
          <div className="flex gap-3 py-2 lg:gap-5">
            <ExternalLink
              url={linkedinUrl}
              label="Linkedin"
              className="inline-block"
            >
              <span className="border-black border-b-2 pb-1">Linkedin</span>
            </ExternalLink>
            <ExternalLink
              url={`mailto:${email}`}
              label="Email"
              className="inline-block"
            >
              <span className="border-black border-b-2 pb-1">E-mail</span>
            </ExternalLink>
          </div>
        </div>
      </div>
    </>
  );
}
