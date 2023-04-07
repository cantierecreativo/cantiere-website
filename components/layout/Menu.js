import Link from "next/link";
import { convertToSlug } from "lib/utils";

export default function Menu({ locale, page }) {
  const navItems = [];

  if (page.blocks.length > 0) {
    page.blocks.map((b) => {
      if (b.label) navItems.push(b.label);
    });
  }

  return (
    <>
      <div className="sticky top-0 z-30">
        {navItems.length > 0 && (
          <div className="bg-green-900 text-white">
            <div className="container">
              <div className="flex gap-6 py-6">
                {navItems.map((n) => (
                  <Link href={`#${convertToSlug(n)}`} className="" key={n.id}>
                    <div className="" key={n.id}>
                      {n}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
