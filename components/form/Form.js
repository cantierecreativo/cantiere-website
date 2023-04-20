import React from "react";
import { useForm } from "react-hook-form";
import t from "lib/locales";
import ExternalLink from "components/links/ExternalLink";
import FormMessage from "components/form/FormMessage";
import Button from "components/blocks/Button";

export default function ContactForm({ page, locale }) {
  console.log(page)
  const labelClass = "";
  const inputClass =
    "border border-black border-x-0 border-t-0 border-b-1lg:pt-2 lg:pb-2 w-full mx-0 placeholder-violet text-base overflow-hidden";
  const selectClass =
    "border border-black border-x-0 border-t-0 border-b-1lg:pt-2 lg:pb-2 w-full mx-0 text-violet";
  const checkboxClass =
    "h-4 w-4 shrink-0 rounded-full bg-white text-blue accent-blue";

  const { register, handleSubmit } = useForm();
  const [result, setResult] = React.useState("");

  const onSubmit = async (data) => {
    // console.log(data);
    setResult("sending");
    const formData = new FormData();
    formData.append("access_key", process.env.NEXT_PUBLIC_W3F);
    // formData.append("ccemail", process.env.NEXT_PUBLIC_CONTACT_EMAIL);
    formData.append("from_name", "XXX Website");
    // formData.append("subject", page.title);

    for (const key in data) {
      formData.append(key, data[key]);
    }

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());

    if (res.success) {
      setResult("success");
    } else {
      setResult("error");
    }
  };

  return (
    <form className="mt-6 pt-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="pb-8">
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
        <input
          type="text"
          name="project"
          id="project"
          placeholder={t("formProject", locale)}
          required={true}
          className={`${inputClass}`}
          {...register("Messaggio")}
        />
      </div>
      <div className="pb-8">
        <select id="service"
          className={selectClass}>
          <option selected>{t("formDropdown", locale)}</option>
          <option value="servizio1">Servizio 1</option>
          <option value="servizio1">Servizio 2</option>
        </select>
      </div>
      <div className="">
        <textarea
          type="text"
          name="message"
          id="message"
          placeholder={t("formMessage", locale)}
          required={true}
          className={`${inputClass} + h-7 + lg:h-8`}
          {...register("Messaggio")}
        />
      </div>
      <div className="text-xs py-1">
        <span>{t("requiredFields", locale)}</span>
      </div>
      <fieldset
        className="mt-9 pt-4 flex px-2 lg:mb-20"
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
          <ExternalLink
            label={"Privacy Policy"}
            url={`//www.iubenda.com/privacy-policy/${t(
              "cookiePolicyId",
              locale
            )}`}
            className="iubenda-nostyle no-brand iubenda-embed iubenda-noiframe underline font-extra-bold"
          >
            {"Privacy Policy"}*
          </ExternalLink>
        </label>
      </fieldset>
      <div className="flex flex-row items-center pt-9 lg:pt-0">
        <p className="pr-6">{t("formSend", locale)}</p>
        <Button bg="blue" />
      </div>
      <FormMessage status={result} locale={locale} />
    </form>
  );
}
