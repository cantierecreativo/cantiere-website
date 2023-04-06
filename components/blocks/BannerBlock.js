import DynamicLink from "components/links/DynamicLink";
import { renderHTML } from "lib/utils";
import Image from "next/image";
import Button from "./Button";
import t from "lib/locales";

export default function BannerBlock({ locale, record }) {
  const { title, text, link } = record;
  return (
    <>
      <div className="bg-blue text-white bg-cover relative overflow-hidden lg:py-12">
        <div className="container py-16 relative z-10 lg:grid lg:grid-cols-12">
          <div className="lg:col-span-7 lg:col-start-2">
            <h2 className="text-3xl xl:text-4xl">{title}</h2>
            <h3 className="pt-5 pb-10 text-lg lg:pb-0 xl:text-xl">
              {renderHTML(text)}
            </h3>
          </div>
          <div className="lg:col-span-3 lg:col-start-10 lg:justify-end lg:flex lg:mt-2 xl:-translate-x-14 xl:translate-y-11 xl:scale-150">
            <DynamicLink record={link} locale={locale}>
              <Button label={t("contact-us-label", locale)} bg="white" />
            </DynamicLink>
          </div>
        </div>
        <Image
          aria-hidden="true"
          src="/background/contactBanner.svg"
          objectFit="cover"
          layout="fill"
          className="absolute w-full h-full z-0 max-w-7xl mx-auto"
          alt="shape"
        />
      </div>
    </>
  );
}
