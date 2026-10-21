import React from "react";
import { useForm, Controller } from "react-hook-form";
import t from "lib/locales";
import FormMessage from "components/form/FormMessage";
import { netlifyForm, NetlifyHiddenFields, submitNetlifyForm } from "components/form/netlify";

const FORM_NAME = "contatti";
import Link from "next/link";
import Icon from "components/layout/Icon";
import { useRouter } from "next/router";

function Multiselect({
  items,
  onSelect,
  onRemove,
  selectedValues,
  variantOnSize = false,
  multiple = true,
}) {
  const selected = selectedValues?.split("|") || [];

  return items.map((item) => {
    return (
      <button
        type="button"
        onClick={() => {
          if (multiple) {
            selected.includes(item)
              ? selected?.length === 1
                ? onRemove()
                : onSelect(selected.filter((i) => i !== item).join("|"))
              : onSelect([...selected, item].join("|"));
          } else {
            onSelect(item);
          }
        }}
        key={item}
        className={`font-semibold border-black py-5 px-5 rounded-md ${
          selected.includes(item) ? "bg-blue text-white" : "bg-white/50"
        } border hover:border-blue ${variantOnSize ? "lg:w-40" : ""}`}
      >
        <span>{item}</span>
      </button>
    );
  });
}

export default function ContactForm({
  locale,
  solutions,
  origin,
  interests,
  showBudget = true,
  onSubmitted,
}) {
  const router = useRouter();

  const checkboxClass =
    "h-4 w-4 shrink-0 rounded-full bg-white text-blue accent-blue";

  const defaultAree = [
    "Web Design",
    "SEO",
    "Marketing",
    "E-Commerce",
    "App",
    "UI/UX",
    "GDPR",
    t("accessibility", locale),
    "DatoCMS",
    "Branding",
  ];

  const aree = interests || defaultAree;

  const budgets = [
    t("budgetLow", locale),
    t("budgetMid", locale),
    t("budgetHigh", locale),
  ];

  const { register, handleSubmit, control } = useForm();
  const [result, setResult] = React.useState("");

  const onSubmit = async (data) => {
    setResult("sending");
    const sent = await submitNetlifyForm(FORM_NAME, { ...data, origine: origin }).catch(() => false);

    if (sent) {
      if (onSubmitted) onSubmitted();
      // setResult("success");
      router.push("/grazie");
    } else {
      setResult("error");
    }
  };

  return (
    <div className="mt-10 p-4 lg:p-12 bg-gray-light border border-black rounded-2xl">
      <form
        id="contact-form"
        className="pt-4 lg:pt-0 relative"
        {...netlifyForm(FORM_NAME)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <NetlifyHiddenFields name={FORM_NAME} register={register} />
        {/* Campi scelti con i bottoni o dalla pagina: nell'HTML solo perché Netlify li registri al deploy. */}
        <input type="hidden" name="servizio" />
        <input type="hidden" name="budget" />
        <input type="hidden" name="origine" />
        <div className="pb-8 lg:pb-12">
          <div className="text-xl font-bold">{t("interestedIn", locale)}</div>
          <div className="flex flex-wrap gap-2 mt-4">
            <Controller
              control={control}
              name="servizio"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Multiselect
                  items={aree}
                  onSelect={onChange}
                  onRemove={onChange}
                  selectedValues={value}
                />
              )}
            />
          </div>
        </div>

        {showBudget && (
          <div className="pb-8">
            <div className="text-xl font-bold">
              {t("budgetAround", locale)}
            </div>
            <div className="flex flex-wrap mt-4 gap-2">
              <Controller
                control={control}
                name="budget"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Multiselect
                    items={budgets}
                    onSelect={onChange}
                    onRemove={onChange}
                    selectedValues={value}
                    variantOnSize
                    multiple={false}
                  />
                )}
              />
            </div>
          </div>
        )}

        <div className="xl:w-1/2 pt-6">
          <div className="text-xl font-bold">{t("myInfo", locale)}</div>
          <div className="py-8">
            <div>
              <label htmlFor="fullName" className="label">
                {t("formFullName", locale)}
              </label>
            </div>
            <input
              className="form-input input mt-2 p-4  rounded-md border-2 border-gray-300 block w-full "
              type="text"
              id="fullName"
              placeholder={t("formFullName", locale)}
              required={true}
              autoComplete="name"
              {...register("nome")}
            />
          </div>
          <div className="pb-8">
            <div>
              <label htmlFor="email" className="label">
                {t("formEmail", locale)}
              </label>
            </div>
            <input
              className="form-input input mt-2 p-4  rounded-md border-2 border-gray-300 block w-full"
              type="email"
              id="email"
              placeholder={t("formEmail", locale)}
              required={true}
              autoComplete="email"
              {...register("email")}
            />
          </div>
          <div className="pb-8">
            <div>
              <label htmlFor="phone" className="label">
                {t("phoneNumber", locale)}
              </label>
            </div>
            <input
              className="form-input input mt-2 p-4  rounded-md border-2 border-gray-300 block w-full"
              type="text"
              id="phone"
              placeholder={t("phone", locale)}
              required={false}
              autoComplete="tel"
              {...register("telefono")}
            />
          </div>

          <div className="">
            <div>
              <label htmlFor="message" className="label">
                {t("formMessage", locale)}
              </label>
            </div>
            <small>
              {t("formNote", locale)}
            </small>
            <textarea
              type="text"
              id="message"
              placeholder={t("formMessage", locale)}
              required={true}
              className="form-input input mt-2 p-2  rounded-md border-2 border-gray-300 block w-full h-24"
              {...register("messaggio")}
            />
          </div>
          <div className="text-xs py-1">
            <span>{t("requiredFields", locale)}</span>
          </div>
          <fieldset
            className="mt-9 pt-4 flex pr-2 lg:pt-0 lg:mb-6"
            role="group"
            aria-label={t("formPrivacyFieldsetLabel", locale)}
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
                  locale
                )}`}
                className="iubenda-nostyle no-brand iubenda-embed iubenda-noiframe duration-200 underline font-extra-bold"
              >
                {"Privacy Policy"}*
              </Link>
            </label>
          </fieldset>
          <div className="flex mt-10 bg-blue border border-black group rounded-md justify-between after:bg-white after:absolute after:top-0 after:left-0 after:right-0 after:h-0 after:duration-300 hover:after:h-full relative ">
            {!result && (
              <button
                id="btn-form"
                type="submit"
                className="flex text-white hover:text-black justify-between w-full xl:text-lg items-center px-6 py-4 font-bold z-[1] relative"
              >
                {t("formSend", locale)}
                <Icon
                  name="arrow"
                  className={`z-10 relative group-hover:fill-black`}
                  size="40"
                  fill="white"
                />
              </button>
            )}
            {result && <FormMessage status={result} locale={locale} />}
          </div>
        </div>
      </form>
    </div>
  );
}
