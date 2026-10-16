import HeroBlog from "components/hero/HeroBlog";
import Menu from "components/layout/Menu";

export default function EditorialTmp({ locale, page, children }) {
  return (
    <>
      <HeroBlog page={page} locale={locale} />
      <div className="container relative z-10">
        <Menu page={page} locale={locale} />
      </div>
      <div className="">{children}</div>
    </>
  );
}
