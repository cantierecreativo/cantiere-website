import Link from "next/link";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import MenuMobile from "components/layout/MenuMobile";
import LanguageSwitcher from "./LanguageSwitcher";
import { resolveLink, IsActive } from "lib/utils";
import Image from "next/image";
import t from "lib/locales";
import { useState, useEffect } from "react";

function RenderNavItem(item, locale, scroll, setTriangle, headerTxt) {
  const classNameActive =
    headerTxt === "white" ? "after:bg-white" : "after:bg-black";
  const classNameItem = scroll
    ? `${
        headerTxt === "white" ? "after:bg-black" : "after:bg-white"
      } font-bold group gap-2 underline-on-hover inline-flex items-center text-sm xl:text-base focus:ring-orange relative whitespace-nowrap`
    : `${
        headerTxt === "white" ? "after:bg-white" : "after:bg-black"
      } group gap-2 inline-flex items-center text-sm xl:text-base focus:ring-orange relative whitespace-nowrap underline-on-hover inline-block`;
  const classDropdownItem = "my-1 font-bold after:bg-blue inline-block";

  if (item.menuItems?.length > 0) {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`${classNameItem} ${
                IsActive(item, locale) == true ? classNameActive : ""
              } `}
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
              <Popover.Panel className="absolute z-10 -ml-4 mt-6 w-auto max-w-md transform px-2 sm:px-0 lg:-left-6 lg:ml-0">
                <div className="absolute left-1/2 -top-1 scale-150 rotate-180" />
                <div className="overflow-hidden">
                  <ul className="relative bg-white text-lg border border-black/80 py-4 text-black min-w-[200px] px-6 gap-1">
                    {item.menuItems.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={resolveLink(item.link, locale)}
                          title={item.link.title}
                          onClick={() => close()}
                          className={`group text-sm xl:text-base focus:ring-orange underline-on-hover after:bg-black ${
                            IsActive(item, locale) == true
                              ? classNameActive
                              : ""
                          } `}
                        >
                          <span className={classDropdownItem}>
                            {item.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
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
          className={`${classNameItem} ${
            IsActive(item, locale) == true ? classNameActive : ""
          }`}
        >
          {item.label}
        </span>
      </Link>
    </>
  );
}

function Header(props) {
  const { locale, site, page, headerTxt } = props;
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
    setBorder = scroll ? "after:bg-black" : "after:bg-white";
  } else setBorder = "after:bg-black";

  if (headerTxt === "white") {
    headerClass = scroll
      ? "bg-white text-black py-2 custom-border-bottom"
      : "bg-transparent text-white py-5";
  } else
    headerClass = scroll
      ? "py-2 bg-white custom-border-bottom"
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
                    <div className="">Menu</div>
                  </div>
                </Popover.Button>
              </div>
              <Popover.Group
                as="nav"
                className="hidden space-x-8 lg:flex lg:items-center lg:justify-between xl:w-full 3xl:pl-4"
              >
                <div className="flex gap-4 items-center justify-between xl:gap-6 xl:absolute xl:left-1/2 xl:-translate-x-1/2">
                  {navItems.map((item) => (
                    <div key={item.id}>
                      {RenderNavItem(
                        item,
                        locale,
                        scroll,
                        setTriangle,
                        headerTxt
                      )}
                    </div>
                  ))}
                </div>
                <div className="hidden items-center space-x-3 lg:flex xl:space-x-6 xl:absolute xl:right-6">
                  <div className={`${setBorder} underline-default`}>
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
