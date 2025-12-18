import { useRef } from "react";
import Link from "next/link";
import Image from "next/legacy/image";
import t from "lib/locales";
import ExternalLink from "components/links/ExternalLink";
import InternalLink from "components/links/InternalLink";
import SocialList from "components/blocks/SocialList";
import { motion, useScroll, useTransform } from "framer-motion";

const variants = {
  offscreen: {
    opacity: 0,
    y: 100,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
    },
  },
};

function FooterButton({ icon, label, url, title }) {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true }}
      variants={variants}
    >
      <Link href={url} title={title} className="group">
        <div className="rounded-full px-9 lg:px-16 py-5 lg:py-10 flex gap-2 lg:gap-8 justify-center items-center relative bg-[#fefffa] hover:bg-gray-200 motion-safe:duration-500 ">
          <div className="text-md lg:text-xl tracking-[-0.01em] text-center text-[#313131] flex justify-between items-center gap-4 lg:gap-6">
            <div className="size-8 flex justify-center items-center">
              {icon}
            </div>
            <span className="font-bold group-hover:underline underline-offset-4">
              {label}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Footer({ locale, site }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const x1 = useTransform(scrollYProgress, [0, 1], [200, -200]);

  const { footerMenu } = site;
  const year = new Date().getFullYear();
  const info = ["©" + year + " Cantiere Creativo Srl", "P.Iva 05210970488"];
  return (
    <>
      <div className="relative w-full aspect-[9/2]">
        <Image
          src="/icons/footer.svg"
          alt="footer"
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />
      </div>

      <footer
        id="footer"
        data-datocms-noindex
        className="bg-blue text-white z-30 relative overflow-hidden"
      >
        <motion.div
          style={{ x: x1 }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <div className="absolute w-[140%] h-[60vh] top-[5%] left-1/2 -translate-x-1/2 -z-0 rotate-12">
            <Image
              src="/icons/stroke1Violet.svg"
              alt="stroke1Violet"
              layout="fill"
              objectFit="cover"
              className="w-full h-full"
            />
          </div>
        </motion.div>
        <div className="container py-6 pt-8 xl:pt-16 z-0 relative">
          <div className="text-center space-y-6">
            <motion.div
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true }}
              variants={variants}
            >
              <div className="text-lg lg:text-xl">
                Il tuo progetto è a portata di click.
              </div>
            </motion.div>
            <motion.div
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true }}
              variants={variants}
            >
              <div className="text-3xl lg:text-5xl font-bold max-w-3xl mx-auto">
                Siamo a tua disposizione per parlare{" "}
                <span className="text-yellow">del tuo prossimo progetto</span>.
              </div>
            </motion.div>
          </div>
          <div className="flex flex-wrap gap-4 lg:gap-9 items-start relative py-12 md:py-24 justify-center">
            {FooterButton({
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="26"
                  viewBox="0 0 36 26"
                  fill="none"
                >
                  <path
                    d="M3.85714 0C1.716 0 0 1.80708 0 3.95092V21.75C0 23.8938 1.716 25.7143 3.85714 25.7143H32.1429C34.284 25.7143 36 23.8938 36 21.75V3.95092C36 1.80708 34.284 0 32.1429 0H3.85714ZM4.04464 2.57143H31.9688L18.7634 15.1071C18.2828 15.5634 17.7453 15.5639 17.2634 15.1071L4.04464 2.57143ZM2.57143 4.71429L11.3304 13.0179L2.57143 21.75V4.71429ZM33.4286 4.71429V21.75L24.6964 13.0045L33.4286 4.71429ZM22.8482 14.7723L31.1919 23.1429H4.82143L13.1919 14.7857L15.4955 16.9688C16.8919 18.2923 19.1352 18.2944 20.5312 16.9688L22.8482 14.7723Z"
                    fill="#5251F5"
                  />
                </svg>
              ),
              label: "SCRIVICI",
              url: "/contatti#contattaci",
              title: "Scrivici",
            })}
            {FooterButton({
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="43"
                  viewBox="0 0 40 43"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M38.8817 30.1447L33.9888 24.517C32.3421 22.622 29.473 22.422 27.5779 24.0687L25.951 25.482C25.3193 26.0319 24.3634 25.9637 23.8135 25.3335L16.7043 17.1549C16.1559 16.5232 16.2226 15.5658 16.8543 15.0174L18.4812 13.6025C20.3748 11.9559 20.5762 9.08524 18.9296 7.19167L14.0366 1.56248C13.2459 0.653565 12.1264 0.0945814 10.9236 0.0112645C9.7208 -0.0735672 8.53467 0.323342 7.62576 1.1141C5.95487 2.56684 3.70837 4.51946 2.08597 5.92979C0.310558 7.47191 -0.412025 9.90174 0.231788 12.1634C0.234817 12.1725 0.237819 12.1816 0.240849 12.1907C3.88407 24.1186 14.6425 36.5525 26.4039 42.2257C26.4099 42.2287 26.4175 42.2317 26.4236 42.2348C28.5853 43.2391 31.1347 42.8786 32.9329 41.3152C34.5568 39.9261 36.7776 37.9947 38.4333 36.5556C39.3438 35.7648 39.9012 34.6454 39.986 33.4441C40.0694 32.2413 39.6725 31.0551 38.8817 30.1447ZM31.7028 26.5045L36.5958 32.1322C36.8594 32.4352 36.9912 32.8306 36.9639 33.232C36.9351 33.6334 36.7488 34.0061 36.4458 34.2697C34.7961 35.7042 32.5829 37.6281 30.9545 39.0202C30.9514 39.0233 30.9484 39.0263 30.9454 39.0278C30.0532 39.8049 28.7883 39.9867 27.7142 39.4929C16.674 34.1651 6.56689 22.5129 3.1418 11.3212C2.82671 10.1941 3.18875 8.98526 4.07342 8.21723L9.61326 3.40151C9.91623 3.13793 10.3116 3.00463 10.7115 3.03341C11.113 3.06068 11.4856 3.24699 11.7492 3.54996L16.6422 9.17916C17.192 9.81085 17.1239 10.7667 16.4937 11.3166L14.8668 12.73C12.9717 14.3766 12.7717 17.2473 14.4184 19.1423C16.4286 21.454 19.5174 25.0078 21.5276 27.321C23.1742 29.2146 26.0448 29.4161 27.9384 27.7694L29.5654 26.3546C30.1971 25.8062 31.1545 25.8728 31.7028 26.5045Z"
                    fill="#5251F5"
                  />
                </svg>
              ),
              label: "CHIAMACI",
              url: "tel:390555387851",
              title: "Chiama +390555387851",
            })}
            {FooterButton({
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="41"
                  viewBox="0 0 28 41"
                  fill="none"
                >
                  <path
                    d="M13.6 0C21.1111 0 27.2 6.08893 27.2 13.6C27.2 15.9034 26.6257 18.1261 25.5463 20.1046C25.5273 20.1497 25.5054 20.1944 25.4806 20.2385L14.6889 39.3841C14.2109 40.2322 12.9898 40.2325 12.5114 39.3847L1.70699 20.239C1.66731 20.1687 1.63526 20.097 1.61042 20.0246C0.558987 18.0663 0 15.8724 0 13.6C0 6.08893 6.08893 0 13.6 0ZM13.6 2.5C7.46964 2.5 2.5 7.46964 2.5 13.6C2.5 15.5238 2.98896 17.3738 3.90736 19.0141C3.94318 19.078 3.97271 19.1432 3.99625 19.2089L13.5994 36.2258L23.2332 19.1342C23.2506 19.0938 23.2704 19.0537 23.2926 19.0141C24.211 17.3738 24.7 15.5238 24.7 13.6C24.7 7.46964 19.7304 2.5 13.6 2.5ZM13.6 7.6C16.9137 7.6 19.6 10.2863 19.6 13.6C19.6 16.9137 16.9137 19.6 13.6 19.6C10.2863 19.6 7.6 16.9137 7.6 13.6C7.6 10.2863 10.2863 7.6 13.6 7.6ZM13.6 10.1C11.667 10.1 10.1 11.667 10.1 13.6C10.1 15.533 11.667 17.1 13.6 17.1C15.533 17.1 17.1 15.533 17.1 13.6C17.1 11.667 15.533 10.1 13.6 10.1Z"
                    fill="#5251F5"
                  />
                </svg>
              ),
              label: "DOVE SIAMO",
              url: "https://www.google.com/maps/place/Cantiere+Creativo/@43.775825,11.2388014,17z/data=!3m1!4b1!4m6!3m5!1s0x132a512cfd40a6d7:0xab02d55f2e455d26!8m2!3d43.775825!4d11.2413763!16s%2Fg%2F1tlngk7j?entry=tts&shorturl=1",
              title: "Dove siamo",
            })}
          </div>
          <nav className="grid grid-cols-2 md:flex md:gap-4 gap-2 gap-y-8 justify-between pb-6 xl:grid xl:grid-cols-6">
            {footerMenu.menuFirstLevels.length > 0 &&
              footerMenu.menuFirstLevels.map((item, n) => (
                <div key={n}>
                  {item.label ? (
                    item.hide ? null : (
                      <InternalLink
                        locale={locale}
                        element={item.link}
                        label={item.label}
                        className="font-bold text-sm block py-1.5 hover:underline underline-offset-2"
                      >
                        {item.label}
                      </InternalLink>
                    )
                  ) : (
                    <div className="">
                      <div className="font-bold text-sm py-1 pb-3">
                        {item.mainLabel}
                      </div>
                      {item.menuItems.map((item, n) => (
                        <div key={item.id + n}>
                          <InternalLink
                            locale={locale}
                            element={item.link}
                            label={item.label}
                            className="text-sm block py-1.5 hover:underline underline-offset-2"
                          >
                            {item.label}
                          </InternalLink>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            <div className="">
              <div className="font-bold text-sm py-1 pb-3">
                {t("contacts", locale)}
              </div>
              <ExternalLink
                url="mailto:info@cantierecreativo.net"
                label="Email"
                className="text-sm block py-1.5 hover:underline underline-offset-2"
              >
                info@cantierecreativo.net
              </ExternalLink>
              <ExternalLink
                url="https://goo.gl/maps/1ryVbBc5zSoimBr57"
                label="Google Maps"
                className="text-sm block py-1.5 hover:underline underline-offset-2"
              >
                Via Botticini 3 - 50143 Firenze (FI)
              </ExternalLink>
              <ExternalLink
                url="tel:+390555387851"
                label={t("phone", locale)}
                className="text-sm block py-1.5 hover:underline underline-offset-2"
              >
                Tel: +39 055 5387851 (Lun-Ven, 9-13 e 14-18)
              </ExternalLink>
            </div>
          </nav>

          <div className="mt-3 pt-3 border-t border-dashed border-white flex flex-col sm:flex-row md:flex-wrap justify-between gap-4 text-base md:text-lg">
            <SocialList />
          </div>
          <div className="mt-3 pt-6 border-t border-dashed	border-white">
            <div className="lg:flex lg:justify-between space-y-3 lg:space-y-0 lg:gap-6 text-xs">
              <div className="">
                {info.join(" - ")}
                <ExternalLink
                  url="https://www.datocms.com"
                  label="DatoCMS Headless CMS"
                  className="hover:underline underline-offset-2"
                >
                  <span> - </span>Made with DatoCMS
                </ExternalLink>
              </div>
              <div className="">
                <Link
                  href={`https://www.iubenda.com/privacy-policy/${t(
                    "cookiePolicyId"
                  )}`}
                  title={`${t("externaLink", locale)} Privacy Policy`}
                  className="iubenda-nostyle no-brand iubenda-embed iubenda-noiframe duration-200 hover:underline underline-offset-2"
                >
                  Privacy Policy
                </Link>
                <span className="px-1"> - </span>
                <Link
                  href={`https://www.iubenda.com/privacy-policy/${t(
                    "cookiePolicyId"
                  )}/cookie-policy`}
                  title={`${t("externaLink", locale)} Cookie Policy`}
                  className="iubenda-nostyle no-brand iubenda-embed iubenda-noiframe duration-200 hover:underline underline-offset-2"
                >
                  Cookie Policy
                </Link>
                <span className="px-1"> - </span>
                <Link
                  href={`https://www.iubenda.com/privacy-policy/${t(
                    "cookiePolicyId"
                  )}`}
                  title={t("privacyPreferences", locale)}
                  className="iubenda-cs-preferences-link iubenda-nostyle no-brand iubenda-embed iubenda-noiframe duration-200 hover:underline underline-offset-2"
                >
                  {t("privacyPreferences", locale)}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
