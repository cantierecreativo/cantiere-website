import t from "lib/locales";

export default function SkipLinks({ locale }) {
  const className =
    "absolute left-1/2 z-60 -translate-x-1/2 -translate-y-full bg-black px-3 py-2 text-white duration-200 focus:translate-y-0";
  return (
    <div data-datocms-noindex>
      <a href="#content" className={className}>
        {t("skipContent", locale)}
      </a>
      <a href="#footer" className={className}>
        {t("skipFooter", locale)}
      </a>
    </div>
  );
}
