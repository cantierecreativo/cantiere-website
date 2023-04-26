import Menu from "components/layout/Menu";
import HeroViolet from "components/hero/HeroViolet";

export default function ModularTmp({ locale, page, children }) {
  return (
    <>
      <HeroViolet locale={locale} page={page} />
      <Menu page={page} locale={locale} />
      <div className="prose">{children}</div>
    </>
  );
}
