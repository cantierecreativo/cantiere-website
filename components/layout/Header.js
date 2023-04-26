import Link from "next/link";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import MenuMobile from "components/layout/MenuMobile";
import LanguageSwitcher from "./LanguageSwitcher";
import { resolveLink, IsActive } from "lib/utils";
import Image from "next/image";
import t from "lib/locales";
import { useState, useEffect } from "react";

function RenderNavItem(item, locale, scroll, setTriangle) {
  const classNameActive = "underline";
  const classNameItem = scroll
    ? "font-bold group gap-2 inline-flex items-center text-sm xl:text-base duration-200 focus:ring-orange"
    : "group gap-2 inline-flex items-center text-sm xl:text-base duration-200 focus:ring-orange";
  const classDropdownItem =
    "block whitespace-nowrap py-2 px-8 text-lg text-center";

  if (item.menuItems?.length > 0) {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`${
                IsActive(item, locale) == true ? classNameActive : ""
              } ${classNameItem}`}
            >
              <span>{item.mainLabel}</span>
              <div
                className={`${setTriangle} translate-y-[2px] duration-200`}
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 -ml-4 mt-6 w-auto max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 drop-shadow-2xl">
                <div className="triangle absolute left-1/2 -top-1 scale-150 rotate-180" />
                <div className="overflow-hidden rounded-lg">
                  <div className="relative grid bg-white text-lg py-4 text-black">
                    {item.menuItems.map((item) => (
                      <Link
                        key={item.id}
                        href={resolveLink(item.link, locale)}
                        title={item.link.title}
                        onClick={() => close()}
                        className={`${
                          IsActive(item, locale) == true ? classNameActive : ""
                        } ${classNameItem}`}
                      >
                        <span className={classDropdownItem}>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  }
  return (
    <>
      <Link
        key={item.id}
        href={resolveLink(item.link, locale)}
        title={item.title}
        className="group"
      >
        <span
          className={`${
            IsActive(item, locale) == true ? classNameActive : ""
          } ${classNameItem}`}
        >
          {item.label}
        </span>
      </Link>
    </>
  );
}

function Header(props) {
  const { locale, site, page, headerTxt } = props;
  const navNewsCategories = site.allNewsCategories;
  const navItems = site.menu.menuFirstLevels;
  const prefix = locale === "it" ? "/" : "/en";

  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  }, []);

  let logoSrc = "";
  let headerClass = "";
  let setTriangle = "";
  let setBorder = "";

  if (headerTxt === "white") {
    logoSrc = scroll ? "/logos/color.svg" : "/logos/white.svg";
  } else logoSrc = scroll ? "/logos/color.svg" : "/logos/black.svg";

  if (headerTxt === "white") {
    setTriangle = scroll ? "triangle-black" : "triangle";
  } else setTriangle = "triangle-black";

  if (headerTxt === "white") {
    setBorder = scroll ? "border-black" : "border-white";
  } else setBorder = "border-black";

  if (headerTxt === "white") {
    headerClass = scroll
      ? "bg-white text-black py-2 drop-shadow-md"
      : "bg-transparent text-white py-5";
  } else
    headerClass = scroll
      ? "py-2 bg-white drop-shadow-md"
      : "py-5 bg-transparent text-black ";

  return (
    <header
      className={`${headerClass} fixed top-0 left-0 right-0 z-40 duration-200`}
    >
      <Popover className="">
        <div className="">
          <div className="container-fluid">
            <div className="flex items-center justify-between lg:space-x-5 xl:justify-start xl:gap-20 3xl:gap-32">
              <Link
                href={prefix}
                key="homepage"
                title="Homepage"
                className="flex items-center"
              >
                <div className="relative h-5 w-[90px] lg:h-12 lg:w-[130px] flex-none">
                  <Image
                    priority
                    src={logoSrc}
                    alt="Logo Cantiere Creativo"
                    layout="fill"
                  />
                </div>
              </Link>
              <div className="flex items-center lg:hidden">
                <Popover.Button className="inline-flex items-center justify-center">
                  <div className={`${setBorder} border-b-2 pb-1`}>
                    <div className="">Menù</div>
                  </div>
                </Popover.Button>
              </div>
              <Popover.Group
                as="nav"
                className="hidden space-x-8 lg:flex lg:items-center lg:justify-between xl:w-full 3xl:pl-4"
              >
                <div className="flex gap-4 items-center justify-between xl:gap-6">
                  {navItems.map((item) => (
                    <div key={item.id}>
                      {RenderNavItem(item, locale, scroll, setTriangle)}
                    </div>
                  ))}
                </div>
                <div className="hidden items-center space-x-3 lg:flex xl:space-x-6">
                  <div
                    className={`${setBorder} border-b-2 pb-1 text-sm xl:text-base translate-y-[3px]`}
                  >
                    <Link
                      href={t("contact-us-url", locale)}
                      title={t("contact-us-label", locale)}
                    >
                      {t("contact-us-label", locale)}
                    </Link>
                  </div>
                  <LanguageSwitcher page={page} locale={locale} />
                </div>
              </Popover.Group>
            </div>
          </div>
        </div>
        <MenuMobile site={site} page={page} locale={locale} />
      </Popover>
    </header>
  );
}

export default Header;
