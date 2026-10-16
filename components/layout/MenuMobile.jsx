import { Popover, Disclosure, Transition } from "@headlessui/react";
import Link from "next/link";
import Icon from "components/layout/Icon";
import { Fragment } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { GLASS, FOCUS } from "./glass";
import { resolveLink, IsActive } from "lib/utils";
import { withLabMenu } from "lib/lab";
import t from "lib/locales";

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

function hasTags(menuItems) {
  return menuItems.some((item) => item.tag);
}

function RenderMobileNavItem(item, locale) {
  const classNameActive = "font-bold";
  const classNameItem = "flex justify-between items-center text-lg text-white";
  const classDropdownItem = "block whitespace-nowrap text-violet-dark";

  if (item.menuItems?.length > 0) {
    const isMegaMenu = hasTags(item.menuItems);
    const { groups, noTag } = groupByTag(item.menuItems);

    return (
      <Disclosure className="relative">
        {({ open, close }) => (
          <>
            <Disclosure.Button className={"group py-5 block w-full"}>
              <div
                className={`${
                  IsActive(item, locale) == true ? classNameActive : ""
                } ${classNameItem}`}
              >
                <div>{item.mainLabel}</div>
                <div className="triangle absolute right-0" />
              </div>
            </Disclosure.Button>

            <Transition
              enter="transition duration-500 ease-out"
              enterFrom="transform opacity-0"
              enterTo="transform opacity-100"
              leave="transition duration-100 ease-out"
              leaveFrom="transform opacity-100"
              leaveTo="transform opacity-0"
            >
              <Disclosure.Panel className="pb-8">
                {isMegaMenu ? (
                  <div className="relative grid gap-6">
                    {Object.keys(groups).map((tagId) => (
                      <div key={tagId}>
                        <div className="text-xs font-bold uppercase tracking-widest text-yellow mb-2">
                          {groups[tagId].title}
                        </div>
                        <div className="grid gap-1">
                          {groups[tagId].items.map((menuItem) => (
                            <Link
                              key={menuItem.id}
                              href={resolveLink(menuItem.link, locale)}
                              title={menuItem.link?.title}
                              className={`${classNameItem}`}
                            >
                              <span className={classDropdownItem}>
                                {menuItem.label}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                    {noTag.length > 0 && (
                      <div className="grid gap-1">
                        {noTag.map((menuItem) => (
                          <Link
                            key={menuItem.id}
                            href={resolveLink(menuItem.link, locale)}
                            title={menuItem.link?.title}
                            className={`${classNameItem}`}
                          >
                            <span className={classDropdownItem}>
                              {menuItem.label}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative grid gap-2">
                    {item.menuItems.map((menuItem) => (
                      <Link
                        key={menuItem.id}
                        href={resolveLink(menuItem.link, locale)}
                        title={menuItem.link?.title}
                        onClick={() => close()}
                        className={`${
                          IsActive(menuItem, locale) == true
                            ? classNameActive
                            : ""
                        } ${classNameItem}`}
                      >
                        <span className={classDropdownItem}>
                          {menuItem.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    );
  }
  return (
    <Link
      key={item.id}
      href={resolveLink(item.link, locale)}
      title={item.title}
      className="group py-5 block"
    >
      <span
        className={`${
          IsActive(item, locale) == true ? classNameActive : ""
        } ${classNameItem}`}
      >
        {item.label}
      </span>
    </Link>
  );
}

export default function MenuMobile({ site, locale, page }) {
  const navItems = withLabMenu(site.menu.menuFirstLevels);
  return (
    <>
      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="fixed inset-x-0 top-0 transform overflow-hidden transition lg:hidden"
        >
          <div className="relative z-40 h-[100vh] bg-blue">
            <div className="py-4">
              <div className="container-fluid">
                <div className="flex items-center justify-between gap-3">
                  <img
                    src="/logos/white.svg"
                    alt={t("logoAlt", locale)}
                    width="840"
                    height="300"
                    className="h-9 w-auto"
                  />
                  <Popover.Button
                    className={`${GLASS} ${FOCUS} flex h-11 items-center px-5 font-bold text-sm uppercase tracking-wider text-black`}
                  >
                    {t("close", locale)}
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="overflow-scroll h-[calc(100vh-80px)]">
              <div className="px-6 md:px-10">
                <nav className="my-5 pb-12">
                  {navItems.map((item) => (
                    <div
                      className="border-b border-dotted border-violet-light relative"
                      key={item.id}
                    >
                      {RenderMobileNavItem(item, locale)}
                    </div>
                  ))}
                </nav>
              </div>
              <div className="px-6 md:px-10 pb-8">
                <div className="flex items-center justify-between">
                  <div className="border-b-2 border-white pb-1 text-lg text-white">
                    <Link
                      href={t("contact-us-url", locale)}
                      title={t("contact-us-label", locale)}
                    >
                      {t("contact-us-label", locale)}
                    </Link>
                  </div>
                  <LanguageSwitcher
                    page={page}
                    locale={locale}
                    className="rounded-full bg-white p-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </>
  );
}
