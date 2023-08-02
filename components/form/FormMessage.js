import t from "lib/locales";

export default function FormMessage({ status, locale }) {
  const bannerClass = "mt-8 rounded-md p-5";
  const titleClass = "text-lg font-bold";
  const textClass = "text-sm";
  if (status === "sending") {
    return (
      <div className={`${bannerClass} bg-blue`}>
        <div className="text-white">
          <div className={titleClass}>{t("formSandingTitle", locale)}</div>
        </div>
      </div>
    );
  }
  if (status === "success") {
    return (
      <div className={`${bannerClass} bg-green`}>
        <div className="text-white">
          <div className={titleClass}>{t("formSuccessTitle", locale)}</div>
          <div className={textClass}>{t("formSuccessText", locale)}</div>
        </div>
      </div>
    );
  }
  if (status === "error") {
    return (
      <div className={`${bannerClass} bg-red`}>
        <div className="text-white">
          <div className={titleClass}>{t("formErrorTitle", locale)}</div>
          <div className={textClass}>{t("formErrorText", locale)}</div>
        </div>
      </div>
    );
  }
  return "";
}
