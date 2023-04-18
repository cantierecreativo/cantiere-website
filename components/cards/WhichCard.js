import StandardCard from "components/cards/StandardCard";
import TeamCard from "components/cards/TeamCard";
import WorkCard from "components/cards/WorkCard";

export default function WhichCard({ locale, record }) {
  switch (record.model) {
    case "work":
      return <WorkCard record={record} locale={locale} />;
    case "team_member":
      return <TeamCard record={record} locale={locale} />;
    default:
      return <StandardCard record={record} locale={locale} />;
  }
}
