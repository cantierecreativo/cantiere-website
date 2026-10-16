import StandardCard from "./StandardCard";
import TeamCard from "./TeamCard";
import WorkCard from "./WorkCard";
import ArticleCard from "./ArticleCard";

export default function WhichCard({ locale, record }) {
  switch (record.model) {
    case "work":
      return <WorkCard record={record} locale={locale} />;
    case "team_member":
      return <TeamCard record={record} locale={locale} />;
    case "article":
      return <ArticleCard record={record} locale={locale} />;
    default:
      return <StandardCard record={record} locale={locale} />;
  }
}
