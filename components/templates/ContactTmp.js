import Menu from "components/layout/Menu";
import HeroContact from "components/hero/HeroContact";

export default function ModularTmp({ locale, page, children }) {
  return (
    <>
      <HeroContact locale={locale} page={page} />
      <div id="contattaci" className="prose">
        {children}
      </div>
    </>
  );
}
