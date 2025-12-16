import Link from "next/link";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import MenuMobile from "components/layout/MenuMobile";
import { resolveLink, IsActive } from "lib/utils";
import Image from "next/legacy/image";
import { useState, useEffect } from "react";
import Icon from "./Icon";
import ExternalLink from "components/links/ExternalLink";

function RenderNavItem(item, locale, scroll, setTriangle, headerTxt) {
  const classNameActive =
    headerTxt === "white" ? "after:bg-white" : "after:bg-black";
  const classNameItem = scroll
    ? `${
        headerTxt === "white" ? "after:bg-black" : "after:bg-white"
      } group gap-1 tracking-wider inline-flex items-center text-sm relative whitespace-nowrap uppercase inline-block`
    : `${
        headerTxt === "white" ? "after:bg-white" : "after:bg-black"
      } group gap-1 tracking-wider inline-flex items-center text-sm relative whitespace-nowrap uppercase inline-block`;
  const classDropdownItem = "my-2 after:bg-blue inline-block";

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
              <div className={`${setTriangle} duration-200`} />
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
              <Popover.Panel className="absolute z-10 -ml-4 mt-5 w-auto max-w-md transform px-2 sm:px-0 lg:-left-6 lg:ml-0">
                <div className="absolute left-1/2 -top-1 scale-150 rotate-180" />
                <div className="overflow-hidden">
                  <ul className="relative bg-white text-lg border border-black/80 py-4 text-black min-w-[200px] px-6">
                    {item.menuItems.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={resolveLink(item.link, locale)}
                          title={item.link.title}
                          onClick={() => close()}
                          className={`group text-sm xl:text-base focus:ring-orange whitespace-nowrap underline-on-hover after:bg-black ${
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
  const { locale, site, page, headerTxt, grandParent, parent } = props;
  const navItems = site.menu.menuFirstLevels;
  const prefix = locale === "it" ? "/" : "/en";

  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 500);
    });
  }, []);

  let logoSrc = "";
  let logoSrcMobile = "";
  let headerClass = "";
  let setTriangle = "";
  let setBorder = "";
  let setMenuMobile = "";
  let setFillIcon = "";

  if (headerTxt === "white") {
    logoSrc = scroll ? "/logos/color.svg" : "/logos/white.svg";
    logoSrcMobile = scroll ? "/logos/color.svg" : "/logos/white.svg";
  } else if (headerTxt === "black") {
    logoSrc = scroll ? "/logos/color.svg" : "/logos/black.svg";
    logoSrcMobile = scroll ? "/logos/color.svg" : "/logos/black.svg";
  } else
    (logoSrc = "/logos/color.svg"), (logoSrcMobile = "/logos/colorMobile.svg");

  if (headerTxt === "white") {
    setTriangle = scroll ? "triangle-black" : "triangle";
  } else setTriangle = "triangle-black";

  if (headerTxt === "white") {
    setBorder = scroll
      ? "after:bg-blue text-white group-hover:text-black"
      : "bg-blue text-black after:bg-white group-hover:text-white";
  } else setBorder = "after:bg-blue text-white group-hover:text-black";

  if (headerTxt === "white") {
    setMenuMobile = scroll
      ? "after:bg-blue text-blue group-hover:text-black"
      : "text-white after:bg-white group-hover:text-white";
  } else setMenuMobile = "after:bg-blue text-black group-hover:text-black";

  if (headerTxt === "white") {
    setFillIcon = scroll
      ? "fill-white group-hover:fill-black"
      : "fill-black group-hover:fill-white";
  } else setFillIcon = "fill-white group-hover:fill-black";

  if (headerTxt === "white") {
    headerClass = scroll
      ? "bg-transparent text-white py-5"
      : "bg-transparent text-white py-5";
  } else
    headerClass = scroll ? "py-2 bg-white " : "py-5 bg-transparent text-black ";

  return (
    <>
      <header
        className={`${headerClass} ${
          scroll ? "" : ""
        } fixed top-0 left-0 right-0 z-40 duration-200`}
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
                  <div className="hidden lg:block relative h-5 w-[90px] lg:h-12 lg:w-[130px] flex-none">
                    <Image
                      priority
                      src={logoSrc}
                      alt="Cantiere Creativo - Il tuo partner digitale"
                      layout="fill"
                    />
                  </div>
                  <div
                    aria-hidden="true"
                    className="lg:hidden relative h-8 w-40 lg:h-12 md:h-14 md:w-52 lg:w-[130px] flex-none"
                  >
                    <Image
                      priority
                      src={logoSrcMobile}
                      alt="Cantiere Creativo - Il tuo partner digitale"
                      layout="fill"
                      objectFit="contain"
                      objectPosition="left"
                    />
                  </div>
                </Link>
                <div className="flex items-center lg:hidden">
                  <Popover.Button className="inline-flex items-center justify-center">
                    <div
                      className={`${setMenuMobile} ${
                        scroll ? "-translate-y-1" : ""
                      } underline-default`}
                    >
                      <div className="">Menu</div>
                    </div>
                  </Popover.Button>
                </div>
                <Popover.Group
                  as="nav"
                  className="hidden space-x-8 lg:flex lg:items-center lg:justify-between xl:w-full 3xl:pl-4"
                >
                  <div
                    className={`xl:absolute xl:left-1/2 xl:-translate-x-1/2 rounded-full px-8 flex gap-4 justify-center items-center self-stretch relative h-full duration-300 ${
                      scroll ? "bg-white/80 text-black" : "bg-[#2591D8]/40"
                    } border border-white/10 backdrop-blur-sm top-0`}
                  >
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
                  <div className="hidden items-center space-x-3 xl:flex xl:space-x-6 xl:absolute xl:right-6">
                    <ExternalLink
                      url="https://calendly.com/francesco-giovannetti-cantiere-creativo/meet?month=2025-10"
                      className="group"
                      locale={locale}
                    >
                      <div
                        className={`flex gap-x-2 items-center py-[12px] group duration-300 bg-blue/80 rounded-full px-6 uppercase text-sm tracking-wider font-serif font-bold border border-white/10 backdrop-blur-sm`}
                      >
                        Prenota una video call
                        <Icon
                          name="arrow"
                          className={`z-10 relative group-hover:fill-black`}
                          size="20"
                          fill="white"
                        />
                      </div>
                    </ExternalLink>
                  </div>
                </Popover.Group>
              </div>
            </div>
          </div>
          <MenuMobile site={site} page={page} locale={locale} />
        </Popover>
      </header>
    </>
  );
}

export default Header;
