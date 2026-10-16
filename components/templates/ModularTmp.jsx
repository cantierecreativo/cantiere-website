import HeroBlue from "components/hero/HeroBlue";
import HeroHp from "components/hero/HeroHp";
import HeroPortfolio from "components/hero/HeroPortfolio";
import DoubleElements from "components/layout/DoubleElements";
import BannerBlock from "components/blocks/BannerBlock";

export default function ModularTmp({ locale, page, children, blockFooter }) {
  return (
    <>
      {page.model === "work" ? (
        <HeroPortfolio locale={locale} page={page} />
      ) : page.model.includes("service") ? (
        <HeroHp page={page} locale={locale} />
      ) : (
        <HeroBlue locale={locale} page={page} />
      )}
      <div className="prose">{children}</div>
      {page.projectsCaseStudiesLinks && (
        <DoubleElements
          locale={locale}
          elements={page.projectsCaseStudiesLinks}
          title={page.elementsTitle}
        />
      )}
      {blockFooter && <BannerBlock record={blockFooter} locale={locale} />}
    </>
  );
}
