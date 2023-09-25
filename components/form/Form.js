import React from "react";
import { useForm } from "react-hook-form";
import t from "lib/locales";
import FormMessage from "components/form/FormMessage";
import Button from "components/blocks/Button";
import Link from "next/link";

export default function ContactForm({ page, solutions, locale }) {
  const labelClass = "sr-only";
  const inputClass =
    "border-b-black border-b pb-2 lg:pt-2 lg:pb-2 w-full mx-0 placeholder-violet text-base overflow-hidden";
  const selectClass =
    "border-b-black border-b pb-2 px-0 lg:pt-2 lg:pb-2 w-full mx-0 text-violet";
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
      "https://hooks.zapier.com/hooks/catch/426384/31gd0se/",
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
    <form className="pt-4 lg:pt-0 relative" onSubmit={handleSubmit(onSubmit)}>
      <div className="pb-8">
        <label htmlFor="fullName" className={labelClass}>
          {t("formFullName", locale)}
        </label>
        <input
          type="text"
          name="fullName"
          id="fullName"
          placeholder={t("formFullName", locale)}
          required={true}
          className={inputClass}
          {...register("Nome & Cognome")}
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
        <label htmlFor="phone" className={labelClass}>
          {t("formPhone", locale)}
        </label>
        <input
          type="tel"
          name="phone"
          id="phone"
          placeholder={t("formPhone", locale)}
          required={true}
          className={inputClass}
          {...register("Telefono")}
        />
      </div>
      <div className="pb-8">
        <label htmlFor="project" className={labelClass}>
          {t("formProject", locale)}
        </label>
        <input
          type="text"
          name="project"
          id="project"
          placeholder={t("formProject", locale)}
          required={false}
          className={`${inputClass}`}
          {...register("Come definisci il tuo progetto?")}
        />
      </div>
      <div className="pb-8">
        <label htmlFor="solution" className={labelClass}>
          {t("formDropdown", locale)}
        </label>
        <select
          id="solution"
          name="solution"
          className={selectClass}
          {...register("Servizio")}
        >
          <option selected>{t("formDropdown", locale)}</option>
          {solutions.map((s) => (
            <option key={s.id}>{s.title}</option>
          ))}
        </select>
      </div>
      <div className="">
        <label htmlFor="message" className={labelClass}>
          {t("formMessage", locale)}
        </label>
        <textarea
          type="text"
          name="message"
          id="message"
          placeholder={t("formMessage", locale)}
          required={true}
          className={`${inputClass} h-20`}
          {...register("Messaggio")}
        />
      </div>
      <div className="text-xs py-1">
        <span>{t("requiredFields", locale)}</span>
      </div>
      <fieldset
        className="mt-9 pt-4 flex pr-2 lg:pt-0 lg:mb-6"
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
          <Button bg="blue" />
        </div>
      </button>
      <FormMessage status="success" locale={locale} />
    </form>
  );
}
