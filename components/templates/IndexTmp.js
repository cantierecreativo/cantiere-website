import HeroText from "components/hero/HeroText";
import Icon from "components/layout/Icon";
import WhichCard from "components/cards/WhichCard";
import PostContent from "components/PostContent";

export default function IndexTmp({ locale, page, items }) {
  const b = page.blocks[0];
  return (
    <div className="overflow-hidden">
      <div className="absolute z-0 w-full">
        <Icon name={"shapeStar"} className="fill-violet-dark/10" />
      </div>
      <HeroText locale={locale} page={page} />
      <div className="container z-10 relative pb-10 lg:pb-24">
        <div className="grid gap-8 py-6 md:grid-cols-2 lg:gap-x-0 lg:gap-y-16 xl:gap-y-20">
          {items.map((i) => (
            <WhichCard key={i.id} locale={locale} record={i} />
          ))}
        </div>
      </div>
      <PostContent key={b.id} record={b} locale={locale} />
    </div>
  );
}
