import Link from "next/link";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import MenuMobile from "components/layout/MenuMobile";
import { resolveLink, IsActive } from "lib/utils";
import Image from "next/legacy/image";
import { useState, useEffect } from "react";
import Icon from "./Icon";
import ExternalLink from "components/links/ExternalLink";

// Helper function to group menu items by tag
function groupByTag(menuItems) {
  const groups = {};
  const noTag = [];

  menuItems.forEach((item) => {
    if (item.tag) {
      const tagId = item.tag.id;
      if (!groups[tagId]) {
        groups[tagId] = {
          title: item.tag.title,
          items: [],
        };
      }
      groups[tagId].items.push(item);
    } else {
      noTag.push(item);
    }
  });

  return { groups, noTag };
}

// Check if menu has items with tags (for mega menu)
function hasTags(menuItems) {
  return menuItems.some((item) => item.tag);
}

function RenderNavItem(item, locale, scroll, setTriangle, headerTxt) {
  const classNameActive =
    headerTxt === "white" ? "after:bg-white" : "after:bg-black";
  const classNameItem =
    "after:bg-black group gap-1 tracking-wider inline-flex items-center font-bold text-sm relative whitespace-nowrap uppercase inline-block decoration-wavy decoration-violet underline-offset-4 decoration-3 font-bold group-hover:underline hover:underline";
  const classDropdownItem = "my-2 after:bg-blue inline-block";

  if (item.menuItems?.length > 0) {
    const isMegaMenu = hasTags(item.menuItems);
    const { groups, noTag } = groupByTag(item.menuItems);

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
              <Popover.Panel
                className={`absolute z-10 mt-5 transform px-2 sm:px-0 ${
                  isMegaMenu
                    ? "left-1/2 -translate-x-1/2 w-auto"
                    : "-ml-4 lg:-left-6 lg:ml-0 w-auto max-w-md"
                }`}
              >
                <div className="absolute left-1/2 -top-1 scale-150 rotate-180" />
                <div className="overflow-hidden shadow-[0_15px_25px_-15px_rgba(82,81,245,0.25)] rounded-3xl">
                  {isMegaMenu ? (
                    <div className="relative rounded-3xl overflow-hidden shadow-[0_0_0_1px_#fff_inset] py-6 px-8 text-black after:absolute after:inset-0 after:backdrop-blur-md after:-z-10 after:bg-white/80">
                      <div className="flex gap-10">
                        {Object.keys(groups).map((tagId) => (
                          <div key={tagId} className="min-w-[160px]">
                            <div className="w-full whitespace-nowrap font-bold uppercase text-blue mb-4 pb-1">
                              {groups[tagId].title}
                            </div>
                            <div className="space-y-2">
                              {groups[tagId].items.map((menuItem) => (
                                <Link
                                  key={menuItem.id}
                                  href={resolveLink(menuItem.link, locale)}
                                  title={menuItem.link?.title}
                                  onClick={() => close()}
                                  className="group text-sm xl:text-base hover:text-blue duration-200 block py-1"
                                >
                                  {menuItem.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                        {noTag.length > 0 && (
                          <div className="min-w-[160px]">
                            <div className="space-y-2">
                              {noTag.map((menuItem) => (
                                <Link
                                  key={menuItem.id}
                                  href={resolveLink(menuItem.link, locale)}
                                  title={menuItem.link?.title}
                                  onClick={() => close()}
                                  className="group text-sm xl:text-base hover:text-blue duration-200 block py-1"
                                >
                                  {menuItem.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    // Standard dropdown
                    <ul className="relative text-lg rounded-3xl overflow-hidden shadow-[0_0_0_1px_#fff_inset] py-4 text-black min-w-[200px] px-6 after:absolute after:inset-0 after:backdrop-blur-md after:-z-10 after:bg-white/60">
                      {item.menuItems.map((menuItem) => (
                        <li key={menuItem.id}>
                          <Link
                            href={resolveLink(menuItem.link, locale)}
                            title={menuItem.link?.title}
                            onClick={() => close()}
                            className={`group text-sm xl:text-base focus:ring-orange whitespace-nowrap underline-on-hover after:bg-black ${
                              IsActive(menuItem, locale) == true
                                ? classNameActive
                                : ""
                            } `}
                          >
                            <span className={classDropdownItem}>
                              {menuItem.label}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
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
    const handleScroll = () => {
      setScroll(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    logoSrc = "/logos/color.svg";
    logoSrcMobile = "/logos/color.svg";
  } else {
    logoSrc = scroll ? "/logos/color.svg" : "/logos/white.svg";
    logoSrcMobile = scroll ? "/logos/color.svg" : "/logos/color.svg";
  }

  setTriangle = "triangle-black";

  if (headerTxt === "white") {
    setBorder = scroll
      ? "after:bg-blue text-white group-hover:text-black"
      : "bg-blue text-black after:bg-white group-hover:text-white";
  } else setBorder = "after:bg-blue text-white group-hover:text-black";

  if (headerTxt === "white") {
    setMenuMobile = scroll
      ? "after:bg-blue text-blue group-hover:text-black"
      : "text-white after:bg-white group-hover:text-white";
  } else setMenuMobile = "after:bg-blue text-blue group-hover:text-black";

  if (headerTxt === "white") {
    setFillIcon = scroll
      ? "fill-white group-hover:fill-black"
      : "fill-black group-hover:fill-white";
  } else setFillIcon = "fill-white group-hover:fill-black";

  if (headerTxt === "white") {
    headerClass = scroll
      ? "bg-transparent text-white py-5"
      : "bg-transparent text-white py-5";
  } else headerClass = "py-5 bg-transparent text-black";

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
                    <div
                      className={`absolute inset-0 transition-opacity duration-700 ${
                        logoSrc === "/logos/white.svg"
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      <Image
                        priority
                        src="/logos/white.svg"
                        alt="Cantiere Creativo - Il tuo partner digitale"
                        layout="fill"
                      />
                    </div>
                    <div
                      className={`absolute inset-0 transition-opacity duration-700 ${
                        logoSrc !== "/logos/white.svg"
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      <Image
                        priority
                        src="/logos/color.svg"
                        alt="Cantiere Creativo - Il tuo partner digitale"
                        layout="fill"
                      />
                    </div>
                  </div>
                  <div
                    aria-hidden="true"
                    className="lg:hidden relative h-8 w-40 lg:h-12 md:h-14 md:w-52 lg:w-[130px] flex-none"
                  >
                    <div
                      className={`absolute inset-0 transition-opacity duration-700 ${
                        logoSrcMobile === "/logos/white.svg"
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      <Image
                        priority
                        src="/logos/white.svg"
                        alt="Cantiere Creativo - Il tuo partner digitale"
                        layout="fill"
                        objectFit="contain"
                        objectPosition="left"
                      />
                    </div>
                    <div
                      className={`absolute inset-0 transition-opacity duration-700 ${
                        logoSrcMobile !== "/logos/white.svg"
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      <Image
                        priority
                        src="/logos/color.svg"
                        alt="Cantiere Creativo - Il tuo partner digitale"
                        layout="fill"
                        objectFit="contain"
                        objectPosition="left"
                      />
                    </div>
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
                    className={`xl:absolute z-10 xl:left-1/2 xl:-translate-x-1/2 rounded-full px-8 flex gap-4 justify-center items-center self-stretch relative h-full motion-safe:duration-300  text-black top-0 py-2 after:shadow-[0_0_0_1px_#fff_inset] after:absolute after:inset-0 after:rounded-full  after:backdrop-blur-sm after:-z-10 after:bg-white/70 shadow-[0_15px_25px_-15px_rgba(82,81,245,0.25)]`}
                  >
                    {navItems.map((item) => (
                      <div key={item.id}>
                        {RenderNavItem(
                          item,
                          locale,
                          scroll,
                          setTriangle,
                          headerTxt,
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
                        className={`flex gap-x-2 items-center py-[12px] group duration-300 bg-blue/80 hover:bg-blue rounded-full px-6 uppercase text-sm tracking-wider text-white font-serif font-bold border border-white/10 backdrop-blur-sm`}
                      >
                        Prenota una video call
                        <Icon
                          name="arrow"
                          className={`z-10 relative`}
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
