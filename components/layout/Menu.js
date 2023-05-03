import Link from "next/link";
import { convertToSlug } from "lib/utils";
import Icon from "./Icon";

export default function Menu({ locale, page }) {
  const navItems = [];

  if (page.blocks?.length > 0) {
    page.blocks.map((b) => {
      if (b.labelMenu) navItems.push(b.labelMenu);
    });
  }

  const TitleOnPage = page.body?.value.document.children.filter(
    (a) => a.type == "heading" && (a.level == 2) | (a.level == 1)
  );

  if (TitleOnPage?.length > 0) {
    TitleOnPage.map((b) => {
      navItems.push(b.children[0].value);
    });
  }

  return (
    <>
      <div className="z-30 xl:sticky lg:top-0">
        {navItems.length > 0 && (
          <div className="xl:absolute xl:pl-4 3xl:pl-[calc(((100vw-1920px)/2)+12px)] xl:pt-24 2xl:pt-36">
            <div className="container">
              <div className="grid lg:grid-cols-12 xl:max-h-[80vh] xl:overflow-y-auto">
                <div className="lg:col-start-2 lg:col-span-10">
                  <div className="lg:flex lg:flex-wrap gap-x-6 gap-y-3 py-6 custom-border-bottom xl:bg-[length:0px_0px] xl:block xl:max-w-[120px]">
                    {navItems.map((n) => (
                      <Link
                        href={`#${convertToSlug(n)}`}
                        className="text-xs group"
                        key={n.id}
                      >
                        <div
                          className="flex items-center py-2 xl:py-2 xl:items-start lg:gap-3 justify-between group-hover:text-blue duration-200"
                          key={n.id}
                        >
                          {n}
                          <Icon
                            name="arrow"
                            size="15"
                            className="rotate-90 flex-none xl:translate-y-px"
                          />
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
