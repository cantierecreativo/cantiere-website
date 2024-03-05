import Menu from "components/layout/Menu";
import HeroBlue from "components/hero/HeroBlue";

export default function ModularTmp({ locale, page, children }) {
  return (
    <>
      <HeroBlue locale={locale} page={page} />
      <div className="prose">{children}</div>
    </>
  );
}
