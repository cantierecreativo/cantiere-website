import StandardCard from "components/cards/StandardCard";

export default function WhichCard({ locale, record }) {
  switch (record.model) {
    case "solution":
      return <StandardCard record={record} locale={locale} />;
    default:
      <StandardCard record={record} locale={locale} />;
  }
}
