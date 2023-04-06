import React from "react";
import { useForm } from "react-hook-form";
import t from "lib/locales";
import ExternalLink from "components/links/ExternalLink";
import FormMessage from "components/form/FormMessage";

export default function ContactForm({ page, locale }) {
  const labelClass = "";
  const inputClass =
    "border lg:px-6 w-full border-pink px-2 placehoder:text-violet py-4";
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
      <div>
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
      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          required={true}
          className={inputClass}
          {...register("Email")}
        />
      </div>
      <div>
        <label htmlFor="message" className={`${labelClass}`}>
          {t("message", locale)}
        </label>
        <textarea
          type="text"
          name="message"
          id="message"
          placeholder={t("message", locale)}
          required={true}
          className={`${inputClass} h-24 border-b border-pink`}
          {...register("Messaggio")}
        />
      </div>
      <fieldset
        className="mr-4 mt-3 flex px-2 lg:px-6 lg:mb-20"
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
          {t("formPrivacyPre", locale)}
          <ExternalLink
            label={"Privacy Policy"}
            url={`//www.iubenda.com/privacy-policy/${t(
              "cookiePolicyId",
              locale
            )}`}
            className="iubenda-nostyle no-brand iubenda-embed iubenda-noiframe underline font-extra-bold"
          >
            {"Privacy Policy"}
          </ExternalLink>
          {t("formPrivacyAfter", locale)}
        </label>
      </fieldset>
      <div className="mt-2">
        <button className="" type="submit">
          INVIA
        </button>
      </div>
      <FormMessage status={result} locale={locale} />
    </form>
  );
}
