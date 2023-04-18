import StandardCard from "components/cards/StandardCard";
import WorkCard from "components/cards/WorkCard";

export default function WhichCard({ locale, record }) {
  switch (record.model) {
    case "work":
      return <WorkCard record={record} locale={locale} />;
    default:
      return <StandardCard record={record} locale={locale} />;
  }
}
