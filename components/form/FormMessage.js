import t from "lib/locales";

export default function FormMessage({ status, locale }) {
  const bannerClass =
    "mt-8 rounded-md p-5 md:absolute bottom-0 right-0 left-[55%] lg:left-[65%] lg:right-0";
  const titleClass = "text-md";
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
      <div className={`${bannerClass} bg-[#006400]`}>
        <div className="text-white">
          <div className={titleClass}>{t("formSuccessTitle", locale)}</div>
        </div>
      </div>
    );
  }
  if (status === "error") {
    return (
      <div className={`${bannerClass} bg-red`}>
        <div className="text-white">
          <div className={titleClass}>{t("formErrorTitle", locale)}</div>
        </div>
      </div>
    );
  }
  return "";
}
