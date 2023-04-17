import Menu from "components/layout/Menu";

export default function ContactTmp({ locale, page, children }) {
  return (
    <>
      <div className="bg-red h-[300px]"></div>
      {/* <Menu page={page} locale={locale} /> */}
      <div className="formatted-text">{children}</div>
    </>
  );
}
