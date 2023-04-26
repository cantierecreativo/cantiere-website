import Form from "components/form/Form";
import { convertToSlug } from "lib/utils";

export default function FormBlock({ locale, record }) {
  const { labelMenu } = record;
  return (
    <>
      <div>
        <Form locale={locale} />
      </div>
    </>
  );
}
