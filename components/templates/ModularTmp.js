import Menu from "components/layout/Menu";
import HeroOrange from "components/hero/HeroOrange";

export default function ModularTmp({ locale, page, children }) {
  return (
    <>
      <HeroOrange locale={locale} page={page} />
      <Menu page={page} locale={locale} />
      <div className="">{children}</div>
    </>
  );
}
