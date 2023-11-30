import { renderHTML } from "lib/utils";
import { Image as DatoImage } from "react-datocms";
import ExternalLink from "components/links/ExternalLink";
import Button from "components/blocks/Button";
import t from "lib/locales";

export default function HeroPortfolio({ locale, page }) {
  const { title, urlWebsite, abstract, cover, teamMembers } = page;
  return (
    <>
      <header className="container pt-36 pb-8 md:pt-44 lg:pt-48 lg:pb-16 z-10 xl:pb-0 relative">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-x-0">
          <div className="grid gap-4 md:gap-6 md:grid-cols-12 lg:grid-cols-11 lg:gap-12 lg:col-span-10 lg:gap-x-0 lg:col-start-2">
            <div className="grid gap-4 md:gap-6 md:col-span-12 md:gap-x-0 xl:gap-10 md:grid-cols-12">
              <div className="md:col-span-9">
                <h1 className="text-2xl md:text-3xl xl:text-5xl">{title}</h1>
                <div className="grid md:grid-cols-12 gap-y-8">
                  {abstract && (
                    <div className="xl:text-lg md:col-span-11 md:pt-6 pt-4">
                      {renderHTML(abstract)}
                    </div>
                  )}
                  {urlWebsite && (
                    <ExternalLink
                      url={urlWebsite}
                      label={title}
                      locale={locale}
                      className="group md:col-span-5 md:justify-end md:flex md:items-start"
                    >
                      <Button bg="blue" label={t("go-to-website", locale)} />
                    </ExternalLink>
                  )}
                </div>
              </div>
              <div className="md:col-span-3 md:pt-6">
                {teamMembers?.length > 0 && (
                  <div className="grid gap-2 content-start md:col-start-10">
                    <div className="text-xs text-black/50 pb-1">Team</div>
                    {teamMembers.map((t) => (
                      <div key={t.id}>{t.name}</div>
                    ))}
                  </div>
                )}
              </div>
              {cover && (
                <div className="md:col-span-12">
                  <div className="unwrapped-on-mobile mt-8">
                    <DatoImage
                      className="rounded-t-full"
                      data={cover.responsiveImage}
                      alt={cover.responsiveImage.alt}
                      title={cover.responsiveImage.title}
                      layout=""
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
