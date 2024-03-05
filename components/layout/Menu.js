import Link from "next/link";
import { convertToSlug } from "lib/utils";

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
      {navItems.length > 0 && (
        <ul className="flex flex-wrap mt-8 xl:mt-0 gap-x-2 gap-y-3 xl:gap-x-3 xl:gap-y-8 md:mb-12">
          {navItems.map((n) => (
            <li key={convertToSlug(n)}>
              <Link
                href={`#${convertToSlug(n)}`}
                className="text-sm group border border-violet-light hover:bg-white hover:text-violet duration-200 rounded-l-full px-5 py-2 pb-3 xl:text-base truncate ... block max-w-[80vw]"
              >
                {n}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
