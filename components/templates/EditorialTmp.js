import Menu from "components/layout/Menu";

export default function EditorialTmp({ locale, page, children }) {
  return (
    <>
      <Menu page={page} locale={locale} />
      <div className="formatted-text">{children}</div>
    </>
  );
}
