import React from "react";
import { useForm } from "react-hook-form";
import t from "lib/locales";
import FormMessage from "components/form/FormMessage";
import Button from "components/blocks/Button";
import Link from "next/link";

export default function FormWork({ page, openPosition, locale, position }) {
  const labelClass = "sr-only";
  const inputClass =
    "border-b-white border-b pb-2 lg:pt-2 lg:pb-2 w-full mx-0 placeholder-white text-base bg-transparent";
  const selectClass =
    "border-b-white border-b pb-2 px-0 lg:pt-2 lg:pb-2 w-full mx-0 text-violet";
  const checkboxClass =
    "h-4 w-4 shrink-0 rounded-full bg-white text-blue accent-blue";

  const { register, handleSubmit } = useForm();
  const [result, setResult] = React.useState("");

  const onSubmit = async (data) => {
    setResult("sending");
    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }

    const res = await fetch(
      "https://hooks.zapier.com/hooks/catch/426384/31g14dx/",
      {
        method: "POST",
        body: formData,
      }
    ).then((res) => res.json());

    if (res.status == "success") {
      setResult("success");
    } else {
      setResult("error");
    }
  };

  return (
    <form
      className="pt-4 lg:pt-0 lg:grid lg:grid-cols-2 lg:gap-x-10 xl:col-span-10 xl:col-start-2 xl:my-16 relative"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="pb-8">
        <label htmlFor="name" className={labelClass}>
          {t("formName", locale)}
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder={t("formName", locale)}
          required={true}
          className={inputClass}
          {...register("Nome")}
        />
      </div>
      <div className="pb-8">
        <label htmlFor="surname" className={labelClass}>
          {t("formSurname", locale)}
        </label>
        <input
          type="text"
          name="surname"
          id="surname"
          placeholder={t("formSurname", locale)}
          required={true}
          className={inputClass}
          {...register("Cognome")}
        />
      </div>
      <div className="pb-8">
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder={t("formEmail", locale)}
          required={true}
          className={inputClass}
          {...register("Email")}
        />
      </div>
      <div className="pb-8">
        <label htmlFor="profile" className={labelClass}>
          {t("formProfile", locale)}
        </label>
        <input
          type="text"
          name="profile"
          id="profile"
          placeholder={t("formProfile", locale)}
          required={false}
          className={inputClass}
          readOnly={position ? true : false}
          value={position ? position : null}
          {...register("Profilo")}
        />
      </div>
      <div aria-hidden="true" className="hidden">
        <input
          type="text"
          name="openPosition"
          id="openPosition"
          required={true}
          className={inputClass}
          value={openPosition}
          readOnly={true}
          {...register("Posizione Aperta?")}
        />
      </div>
      <div className="pb-8 lg:col-span-2">
        <label htmlFor="link" className={labelClass}>
          Link
        </label>
        <input
          type="url"
          name="link"
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
          name="message"
          id="message"
          placeholder={t("formTalk", locale)}
          required={true}
          className={`${inputClass} h-20`}
          {...register("Messaggio")}
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
          value=""
          required={true}
          className={checkboxClass}
        />
        <label htmlFor="privacyCheckbox" className="ml-2 text-xs">
          {t("formPrivacyPolicy", locale)}
          <Link
            title={"Privacy Policy"}
            href={`https://www.iubenda.com/privacy-policy/${t(
              "cookiePolicyId",
              locale
            )}`}
            className="iubenda-nostyle no-brand iubenda-embed iubenda-noiframe duration-200 underline font-extra-bold"
          >
            {"Privacy Policy"}*
          </Link>
        </label>
      </fieldset>
      <button className="" type="submit">
        <div className="flex flex-row items-center pt-9 lg:pt-0">
          <p className="pr-6">{t("formSend", locale)}</p>
          <Button bg="white" />
        </div>
      </button>
      <FormMessage status={"success"} locale={locale} />
    </form>
  );
}
