import React from "react";
import { useForm } from "react-hook-form";
import t from "lib/locales";
import FormMessage from "components/form/FormMessage";
import { netlifyForm, NetlifyHiddenFields, submitNetlifyForm } from "components/form/netlify";

const FORM_NAME = "candidature";
import Button from "components/blocks/Button";
import Link from "next/link";

export default function FormWork({ page, openPosition, locale, position }) {
  const labelClass = "sr-only";
  const inputClass =
    "border-b-black border-b pb-2 lg:pt-2 lg:pb-2 w-full mx-0 placeholder-black text-base bg-transparent";
  const selectClass =
    "border-b-black border-b pb-2 px-0 lg:pt-2 lg:pb-2 w-full mx-0 text-violet";
  const checkboxClass =
    "h-4 w-4 shrink-0 rounded-full bg-white text-blue accent-blue";

  const { register, handleSubmit } = useForm();
  const [result, setResult] = React.useState("");

  const onSubmit = async (data) => {
    setResult("sending");
    const sent = await submitNetlifyForm(FORM_NAME, data).catch(() => false);

    if (sent) {
      setResult("success");
    } else {
      setResult("error");
    }
  };

  return (
    <form
      className="lg:grid lg:grid-cols-2 bg-violet-custom p-12 rounded-xl lg:gap-x-10 xl:col-span-10 xl:col-start-2 xl:my-16 relative"
      {...netlifyForm(FORM_NAME)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <NetlifyHiddenFields name={FORM_NAME} register={register} />
      <div className="pb-8">
        <label htmlFor="name" className={labelClass}>
          {t("formName", locale)}
        </label>
        <input
          type="text"
          id="name"
          placeholder={t("formName", locale)}
          required={true}
          className={inputClass}
          {...register("nome")}
        />
      </div>
      <div className="pb-8">
        <label htmlFor="surname" className={labelClass}>
          {t("formSurname", locale)}
        </label>
        <input
          type="text"
          id="surname"
          placeholder={t("formSurname", locale)}
          required={true}
          className={inputClass}
          {...register("cognome")}
        />
      </div>
      <div className="pb-8">
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder={t("formEmail", locale)}
          required={true}
          className={inputClass}
          {...register("email")}
        />
      </div>
      <div className="pb-8">
        <label htmlFor="profile" className={labelClass}>
          {t("formProfile", locale)}
        </label>
        <input
          type="text"
          id="profile"
          placeholder={t("formProfile", locale)}
          required={false}
          className={inputClass}
          readOnly={position ? true : false}
          value={position ? position : null}
          {...register("profilo")}
        />
      </div>
      <div aria-hidden="true" className="hidden">
        <input
          type="text"
          id="openPosition"
          required={true}
          className={inputClass}
          value={openPosition}
          readOnly={true}
          {...register("posizione")}
        />
      </div>
      <div className="pb-8 lg:col-span-2">
        <label htmlFor="link" className={labelClass}>
          Link
        </label>
        <input
          type="url"
          id="link"
          placeholder={t("formLink", locale)}
          required={true}
          className={inputClass}
          {...register("link")}
        />
      </div>
      <div className="lg:col-span-2">
        <label htmlFor="message" className={labelClass}>
          {t("formMessage", locale)}
        </label>
        <textarea
          type="text"
          id="message"
          placeholder={t("formTalk", locale)}
          required={true}
          className={`${inputClass} h-20`}
          {...register("messaggio")}
        />
      </div>
      <div className="text-xs py-1 lg:col-span-2">
        <span>{t("requiredFields", locale)}</span>
      </div>
      <fieldset
        className="mt-9 pt-4 flex pr-2 lg:pt-0 lg:mb-6 lg:col-span-2"
        role="group"
        aria-label={t("formPrivacyFieldsetLabel")}
      >
        <legend className="sr-only">
          {t("formPrivacyFieldsetLabel", locale)}
        </legend>
        <input
          id="privacyCheckbox"
          type="checkbox"
          value="sì"
          required={true}
          className={checkboxClass}
          {...register("privacy")}
        />
        <label htmlFor="privacyCheckbox" className="ml-2 text-xs">
          {t("formPrivacyPolicy", locale)}
          <Link
            title={"Privacy Policy"}
            href={`https://www.iubenda.com/privacy-policy/${t(
              "cookiePolicyId",
              locale,
            )}`}
            className="iubenda-nostyle no-brand iubenda-embed iubenda-noiframe duration-200 underline font-extra-bold"
          >
            {"Privacy Policy"}*
          </Link>
        </label>
      </fieldset>
      <button type="submit" className="group">
        <div className="flex flex-row items-center pt-9 lg:pt-0">
          <p className="pr-6">{t("formSend", locale)}</p>
          <Button bg="white" />
        </div>
      </button>
      <FormMessage status={result} locale={locale} />
    </form>
  );
}
