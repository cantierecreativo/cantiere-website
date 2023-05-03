import Menu from "components/layout/Menu";
import HeroOrange from "components/hero/HeroOrange";
import HeroPortfolio from "components/hero/HeroPortfolio";

export default function ModularTmp({ locale, page, children }) {
  return (
    <>
      {page.model === "work" ? (
        <HeroPortfolio locale={locale} page={page} />
      ) : (
        <HeroOrange locale={locale} page={page} />
      )}
      <Menu page={page} locale={locale} />
      <div className="prose">{children}</div>
    </>
  );
}
