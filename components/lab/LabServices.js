import Link from "next/link";
import t from "lib/locales";
import { trackLab, CALENDLY_URL } from "lib/lab";

const cardClass =
  "group flex flex-col gap-4 rounded-3xl bg-[#F7F6FE] p-6 duration-200 hover:-translate-y-1 lg:p-8";

function CardBody({ item, showLink = true }) {
  return (
    <>
      <h3 className="text-xl font-bold">{item.title}</h3>
      <p className="text-base text-gray-dark">{item.text}</p>
      {showLink && (
        <span className="mt-auto pt-2 text-sm font-bold uppercase tracking-wider text-blue group-hover:underline">
          {item.linkLabel} →
        </span>
      )}
    </>
  );
}

// Servizi in vendita collegati al Lab: pagina interna o video call.
export default function LabServices({ services, locale = "it" }) {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container lg:grid lg:grid-cols-12">
        <div className="lg:col-span-10 lg:col-start-2">
          <p className="text-sm font-bold uppercase text-blue">{services.eyebrow}</p>
          <h2 className="mt-4 max-w-4xl text-balance text-3xl font-bold md:text-4xl xl:text-5xl">{services.title}</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {services.items.map((item) =>
              services.showLinks === false ? (
                <div key={item.id} className="flex flex-col gap-4 rounded-3xl bg-[#F7F6FE] p-6 lg:p-8">
                  <CardBody item={item} showLink={false} />
                </div>
              ) : item.call ? (
                <a
                  key={item.id}
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener"
                  onClick={() => trackLab("cta_videocall", { project: "lab_index", position: item.id })}
                  className={cardClass}
                >
                  <CardBody item={item} />
                  <span className="sr-only">{t("lab_new_tab", locale)}</span>
                </a>
              ) : (
                <Link key={item.id} href={item.href} className={cardClass}>
                  <CardBody item={item} />
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
