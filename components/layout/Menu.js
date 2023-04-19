import Link from "next/link";
import { convertToSlug } from "lib/utils";
import Icon from "./Icon";

export default function Menu({ locale, page }) {
  const navItems = [];

  if (page.blocks.length > 0) {
    page.blocks.map((b) => {
      if (b.labelMenu) navItems.push(b.labelMenu);
    });
  }

  return (
    <>
      <div className="sticky md:top-10 lg:top-16 xl:top-28 z-30 xl:relative">
        {navItems.length > 0 && (
          <div className="bg-white xl:absolute xl:pl-4 3xl:pl-[calc(((100vw-1920px)/2)+12px)]">
            <div className="container">
              <div className="grid lg:grid-cols-12">
                <div className="lg:col-start-2 lg:col-span-10">
                  <div className="flex flex-wrap gap-x-6 gap-y-3 py-6 border-b border-dashed border-black xl:border-none xl:block xl:max-w-[150px]">
                    {navItems.map((n) => (
                      <Link
                        href={`#${convertToSlug(n)}`}
                        className="text-xs"
                        key={n.id}
                      >
                        <div className="flex items-center xl:py-2" key={n.id}>
                          {n}
                          <Icon name="arrow" size="15" className="rotate-90" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
