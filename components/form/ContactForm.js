import React from "react";
import { useForm, Controller } from "react-hook-form";
import t from "lib/locales";
import FormMessage from "components/form/FormMessage";
import Link from "next/link";
import Icon from "components/layout/Icon";
import { useRouter } from "next/router";

function Multiselect({
  items,
  onSelect,
  onRemove,
  selectedValues,
  variantOnSize = false,
}) {
  const selected = selectedValues?.split("|") || [];

  return items.map((item) => {
    return (
      <button
        type="button"
        onClick={() => {
          selected.includes(item)
            ? selected?.length === 1
              ? onRemove()
              : onSelect(selected.filter((i) => i !== item).join("|"))
            : onSelect([...selected, item].join("|"));
        }}
        key={item}
        className={`font-semibold border-black py-5 px-5 ${
          selected.includes(item) ? "bg-blue text-white" : ""
        } border hover:border-blue ${variantOnSize ? "lg:w-40" : ""}`}
      >
        <span>{item}</span>
      </button>
    );
  });
}

export default function ContactForm({ locale, solutions }) {
  // console.log("solutions", solutions);

  const router = useRouter();

  const checkboxClass =
    "h-4 w-4 shrink-0 rounded-full bg-white text-blue accent-blue";

  const aree = [
    "Web Design",
    "SEO",
    "Marketing",
    "E-Commerce",
    "App",
    "UI/UX",
    "GDPR",
    "Accessibilitá",
    "DatoCMS",
    "Branding",
  ];

  const budgets = ["Fino a 5K", "Da 5 a 20K", "Più di 20K"];

  const { register, handleSubmit, control } = useForm();
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
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="pb-8 lg:pb-12">
          <div className="text-xl font-bold">Sono interessato a:</div>
          <div className="flex flex-wrap gap-2 mt-4">
            <Controller
              control={control}
              name="Servizio"
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

        <div className="pb-8">
          <div className="text-xl font-bold">
            Pensavo ad un budget intorno a:
          </div>
          <div className="flex flex-wrap mt-4 gap-2">
            <Controller
              control={control}
              name="Budget"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Multiselect
                  items={budgets}
                  onSelect={onChange}
                  onRemove={onChange}
                  selectedValues={value}
                  variantOnSize
                />
              )}
            />
          </div>
        </div>

        <div className="xl:w-1/2 pt-6">
          <div className="text-xl font-bold">Le mie info sono:</div>
          <div className="py-8">
            <div>
              <label htmlFor="fullName" className="label">
                {t("formFullName", locale)}
              </label>
            </div>
            <input
              className="form-input input mt-2 p-4  rounded-md border-2 border-gray-300 block w-full "
              type="text"
              name="fullName"
              id="fullName"
              placeholder={t("formFullName", locale)}
              required={true}
              autoComplete="name"
              {...register("Nome & Cognome")}
            />
          </div>
          <div className="pb-8">
            <div>
              <label htmlFor="email" className="label">
                Email *
              </label>
            </div>
            <input
              className="form-input input mt-2 p-4  rounded-md border-2 border-gray-300 block w-full"
              type="email"
              name="email"
              id="email"
              placeholder={t("formEmail", locale)}
              required={true}
              autoComplete="email"
              {...register("Email")}
            />
          </div>
          <div className="pb-8">
            <div>
              <label htmlFor="phone" className="label">
                Numero di telefono
              </label>
            </div>
            <input
              className="form-input input mt-2 p-4  rounded-md border-2 border-gray-300 block w-full"
              type="text"
              name="phone"
              id="phone"
              placeholder="Telefono"
              required={false}
              autoComplete="tel"
              {...register("Telefono")}
            />
          </div>

          <div className="">
            <div>
              <label htmlFor="message" className="label">
                {t("formMessage", locale)}
              </label>
            </div>
            <small>
              Scrivici una nota o parlaci brevemente del tuo progetto.
            </small>
            <textarea
              type="text"
              name="message"
              id="message"
              placeholder={t("formMessage", locale)}
              required={true}
              className="form-input input mt-2 p-2  rounded-md border-2 border-gray-300 block w-full h-24"
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
