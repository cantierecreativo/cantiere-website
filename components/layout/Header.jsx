import Link from "next/link";
import { Fragment, useRef } from "react";
import { Popover, Transition } from "@headlessui/react";
import MenuMobile from "components/layout/MenuMobile";
import { resolveLink, IsActive } from "lib/utils";
import { withLabMenu } from "lib/lab";
import Icon from "./Icon";
import LanguageSwitcher from "components/layout/LanguageSwitcher";
import t from "lib/locales";
import { GLASS, FOCUS } from "./glass";
import { useBackdropTone } from "./backdropTone";

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
  const { locale, site, page, headerTxt } = props;
  const navItems = withLabMenu(site.menu.menuFirstLevels);
  const prefix = locale === "it" ? "/" : "/en";

  // Il logo segue lo sfondo che ha sotto: bianco sul blu, sul viola e sulle foto (con ombra), a colori sul chiaro.
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const tone = useBackdropTone(
    logoRef,
    headerRef,
    headerTxt === "black" ? "light" : "dark",
  );
  const white = tone !== "light";

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-40 py-4 lg:py-5 text-black"
    >
      <Popover>
        <div className="container-fluid">
          <div className="flex items-center justify-between gap-3 lg:gap-5 xl:justify-start">
            <Link
              href={prefix}
              title={t("homepage", locale)}
              className={`${FOCUS} block flex-none rounded-md`}
            >
              <span
                ref={logoRef}
                className="relative block h-9 w-[100px] lg:h-12 lg:w-[133px]"
              >
                <img
                  src="/logos/white.svg"
                  alt={t("logoAlt", locale)}
                  width="840"
                  height="300"
                  className={`absolute inset-0 h-full w-auto motion-safe:transition-[opacity,filter] motion-safe:duration-500 ${white ? "opacity-100" : "opacity-0"} ${
                    tone === "image"
                      ? "drop-shadow-[0_1px_6px_rgba(5,14,57,0.45)]"
                      : ""
                  }`}
                />
                <img
                  src="/logos/color.svg"
                  alt=""
                  aria-hidden="true"
                  width="829"
                  height="300"
                  className={`absolute inset-0 h-full w-auto motion-safe:transition-opacity motion-safe:duration-500 ${white ? "opacity-0" : "opacity-100"}`}
                />
              </span>
            </Link>
            <Popover.Button
              className={`${GLASS} ${FOCUS} lg:hidden flex h-11 items-center px-5 font-bold text-sm uppercase tracking-wider`}
            >
              {t("menu", locale)}
            </Popover.Button>
            <Popover.Group
              as="nav"
              aria-label={t("mainMenu", locale)}
              className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-between lg:gap-5"
            >
              <div
                className={`${GLASS} xl:absolute xl:left-1/2 xl:-translate-x-1/2 flex h-12 items-center justify-center gap-4 px-8`}
              >
                {navItems.map((item) => (
                  <div key={item.id}>
                    {RenderNavItem(
                      item,
                      locale,
                      false,
                      "triangle-black",
                      headerTxt,
                    )}
                  </div>
                ))}
              </div>
              <div
                className={`${GLASS} hidden xl:flex xl:ml-auto items-center gap-1 p-1`}
              >
                <LanguageSwitcher page={page} locale={locale} />
                <Link
                  href={t("contact-us-url", locale)}
                  className={`${FOCUS} group flex items-center gap-2 rounded-full bg-blue px-5 py-2.5 font-bold text-sm uppercase tracking-wider text-white duration-200 hover:bg-blue-dark`}
                >
                  {t("contact-us-label", locale)}
                  <Icon
                    name="arrow"
                    size="18"
                    fill="white"
                    className="motion-safe:duration-200 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </Popover.Group>
          </div>
        </div>
        <MenuMobile site={site} page={page} locale={locale} />
      </Popover>
    </header>
  );
}

export default Header;
