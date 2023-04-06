import { Popover, Disclosure, Transition } from "@headlessui/react";
import Link from "next/link";
import Icon from "components/layout/Icon";
import { Fragment } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { resolveLink, IsActive } from "lib/utils";
import Image from "next/image";
import t from "lib/locales";

function RenderMobileNavItem(item, locale) {
  const classNameActive = "font-bold";
  const classNameItem = "flex justify-between items-center text-lg";
  const classDropdownItem = "block whitespace-nowrap text-violet-dark";

  if (item.menuItems?.length > 0) {
    return (
      <Disclosure className="relative">
        {({ open, close }) => (
          <>
            <Disclosure.Button className={"group"}>
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
              <Disclosure.Panel className="pt-4">
                <div className="relative grid gap-2">
                  {item.menuItems.map((item) => (
                    <Link
                      key={item.id}
                      href={resolveLink(item.link, locale)}
                      title={item.link.title}
                      onClick={() => close()}
                      legacyBehavior
                      className={`${
                        IsActive(item, locale) == true ? classNameActive : ""
                      } ${classNameItem}`}
                    >
                      <span className={classDropdownItem}>{item.label}</span>
                    </Link>
                  ))}
                </div>
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
      href={resolveLink(item, locale)}
      title={item.title}
      className="group"
      legacyBehavior
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
  const navItems = site.menu.menuFirstLevels;
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
            <div className="py-5">
              <div className="px-6 md:px-10">
                <div className="flex items-center justify-between lg:justify-start lg:space-x-5">
                  <div className="relative h-5 w-[90px] lg:h-12 lg:w-[130px]">
                    <Image
                      priority
                      src="/logos/white.svg"
                      alt="Logo Cantiere Creativo"
                      layout="fill"
                    />
                  </div>
                  <div className="flex items-center lg:hidden">
                    <Popover.Button className="inline-flex items-center justify-center text-black">
                      <div className="border-b-2 border-white pb-1">
                        <div className="text-white">{t("close", locale)}</div>
                      </div>
                    </Popover.Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-scroll h-[calc(100vh-80px)]">
              <div className="px-6 md:px-10">
                <nav className="my-5 pb-12">
                  {navItems.map((item) => (
                    <div
                      className="py-5 border-b border-dashed border-violet-light relative"
                      key={item.id}
                    >
                      {RenderMobileNavItem(item, locale)}
                    </div>
                  ))}
                </nav>
              </div>
              <div className="px-6 md:px-10 pb-8">
                <div className="flex items-center justify-between">
                  <div className="border-b-2 border-white pb-1 text-lg">
                    <Link
                      href={t("contact-us-url", locale)}
                      title={t("contact-us-label", locale)}
                    >
                      {t("contact-us-label", locale)}
                    </Link>
                  </div>
                  <LanguageSwitcher page={page} locale={locale} />
                </div>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </>
  );
}
