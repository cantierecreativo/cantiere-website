import { renderHTML } from "lib/utils";
import { Disclosure, Transition } from "@headlessui/react";
import Icon from "components/layout/Icon";

export default function FaqBlock({ locale, record }) {
  const { id, title, text, faqs } = record;
  return (
    <section>
      {title && <h2 class="">{title}</h2>}
      {text && <h3 class="">{renderHTML(text)}</h3>}
      <div className="border-b border-black mt-4">
        {faqs.map((r) => {
          return (
            <Disclosure key={r.id} as="div" className="border-t border-black">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex items-center justify-between w-full p-2">
                    <span
                      className={`${open ? "text-red-500" : ""} duration-200`}
                    >
                      {renderHTML(r.question)}
                    </span>
                    <Icon
                      name="down"
                      size="30"
                      fill="red-500"
                      className={`${open ? "rotate-180" : ""} fill-red-500`}
                    />
                  </Disclosure.Button>
                  <Transition
                    enter="transition duration-300 ease-out"
                    enterFrom="transform scale-100 opacity-0"
                    enterTo="transform scale-300 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-300 opacity-100"
                    leaveTo="transform scale-100 opacity-0"
                  >
                    <Disclosure.Panel>
                      <div className="p-2">
                        <span>{renderHTML(r.reply)}</span>
                      </div>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          );
        })}
      </div>
    </section>
  );
}
