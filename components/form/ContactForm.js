import React from "react";
import { useForm, Controller } from "react-hook-form";
import t from "lib/locales";
import FormMessage from "components/form/FormMessage";
import Link from "next/link";
import Icon from "components/layout/Icon";

function Multiselect({ items, onSelect, onRemove, selectedValues }) {
  const selected = selectedValues?.split("|") || [];
  return (
    <div className="my-5">
      {items.map((item) => {
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
            className={`uppercase font-semibold py-4 px-4 rounded-full tracking-wide shadow-md ${
              selected.includes(item) ? "bg-blue text-white" : "bg-white "
            } border-2   m-2`}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}

export default function ContactForm({ locale }) {
  const labelClass = "sr-only";
  const inputClass =
    "border-b-black border-b pb-2 lg:pt-2 lg:pb-2 w-full mx-0 placeholder-violet text-base overflow-hidden";
  const selectClass =
    "border-b-black border-b pb-2 px-0 lg:pt-2 lg:pb-2 w-full mx-0 text-violet";
  const checkboxClass =
    "h-4 w-4 shrink-0 rounded-full bg-white text-blue accent-blue";

  const solutions = [
    "WEB DESIGN",
    "SEO",
    "MARKETING",
    "E-COMMERCE",
    "APP",
    "UI/UX",
    "MANUTENZIONE",
    "RESTYLE",
    "CONSULENZA",
    "AREA PRIVATA",
    "GDPR",
    "ACCESSIBILITÁ",
  ];

  const budgets = ["<= 5k", "DA 5 A 10K", "DA 10 A 20K", ">20K"];

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
      setResult("success");
    } else {
      setResult("error");
    }
  };

  return (
    <div className="bg-[#f4f4f4] relative overflow-x-hidden">
      <section
        className="container margin-scroll-standard my-10 mx-auto p-10"
        id="#contattaci"
      >
        <div className="flex flex-col justify-center">
          <div className="">
            <h2 className="text-3xl text-violet font-bold py-10">Contattaci</h2>

            <div className="text-xl pb-4">
              Non esitare a scriverci! Sia che tu abbia già una grande idea che
              una vaga idea, o anche solo per essere ricontattato per un
              preventivo.
              <br />
              <strong>Potremmo avere già la soluzione giusta per te.</strong>
            </div>
          </div>
          <div className="mt-10 border-blue border-y-2 py-10">
            <form
              className="pt-4 lg:pt-0 relative"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="pb-8">
                <div className="text-xl font-semibold">Sono interessato a:</div>
                <div className="flex flex-wrap">
                  <Controller
                    control={control}
                    name="Servizio"
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <Multiselect
                        items={solutions}
                        onSelect={onChange}
                        onRemove={onChange}
                        selectedValues={value}
                      />
                    )}
                  />
                </div>
              </div>

              <div className="pb-8">
                <div className="text-xl font-semibold">
                  Pensavo ad un budget intorno a:
                </div>
                <div className="flex flex-wrap">
                  <Controller
                    control={control}
                    name="Budget"
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <Multiselect
                        items={budgets}
                        onSelect={onChange}
                        onRemove={onChange}
                        selectedValues={value}
                      />
                    )}
                  />
                </div>
              </div>

              <div className="text-xl font-semibold">Le mie info sono:</div>
              <div className="py-8">
                <div>
                  <label htmlFor="fullName" className="label">
                    {t("formFullName", locale)}
                  </label>
                </div>
                <input
                  className="form-input input mt-2 p-2  rounded-md border-gray-300 block w-full h-10"
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder={t("formFullName", locale)}
                  required={true}
                  {...register("Nome & Cognome")}
                />
              </div>
              <div className="pb-8">
                <div>
                  <label htmlFor="email" className="label">
                    Email
                  </label>
                </div>
                <input
                  className="form-input input mt-2 p-2  rounded-md border-gray-300 block w-full h-10"
                  type="email"
                  name="email"
                  id="email"
                  placeholder={t("formEmail", locale)}
                  required={true}
                  {...register("Email")}
                />
              </div>

              <div className="">
                <div>
                  <label htmlFor="message" className="label">
                    {t("formMessage", locale)}
                  </label>
                </div>
                <small>
                  Scrivici una nota i paraci brevemente del tup progetto.
                </small>
                <textarea
                  type="text"
                  name="message"
                  id="message"
                  placeholder={t("formMessage", locale)}
                  required={true}
                  className="form-input input mt-2 p-2  rounded-md border-gray-300 block w-full h-20"
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
              <div className="flex mt-10 justify-end">
                <button
                  type="submit"
                  className="self-end py-4 uppercase font-semibold  px-5 rounded-full tracking-wide shadow-md bg-blue text-white border-2 border-blue m-2 flex items-center justify-center"
                >
                  {t("formSend", locale)}
                  <Icon
                    name="arrow"
                    className={`z-10 relative`}
                    size="40"
                    fill="white"
                  />
                </button>
              </div>
              <FormMessage status={result} locale={locale} />
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
