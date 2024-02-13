import ExternalLink from "components/links/ExternalLink";

export default function SocialList() {
  const urlClass = "hover:text-blue duration-200";

  return (
    <>
      <ExternalLink
        url="https://twitter.com/teamcantiere"
        label="Twitter"
        className={urlClass}
      >
        <span className=" md:pt-1 md:pb-9">Twitter</span>
      </ExternalLink>
      <ExternalLink
        url="https://www.linkedin.com/company/cantiere-creativo/mycompany/?viewAsMember=true"
        label="Linkedin"
        className={urlClass}
      >
        <span className=" md:pt-1 md:pb-9">Linkedin</span>
      </ExternalLink>
      <ExternalLink
        url="https://www.instagram.com/cantiere_creativo_/"
        label="Instagram"
        className={urlClass}
      >
        <span className="  md:pt-1 md:pb-9">Instagram</span>
      </ExternalLink>
      <ExternalLink
        url="https://www.facebook.com/cantierecreativo"
        label="Facebook"
        className={urlClass}
      >
        <span className=" pt-0 md:pt-1 md:pb-9">Facebook</span>
      </ExternalLink>
      <ExternalLink
        url="https://medium.com/cantiere-creativo"
        label="Medium"
        className={urlClass}
      >
        <span className=" pt-0 md:pt-1 md:pb-9">Medium</span>
      </ExternalLink>
    </>
  );
}
