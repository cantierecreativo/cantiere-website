import Form from "components/form/Form";

export default function FormBlock({ locale, record }) {
  return (
    <>
      <div className="container">
        <Form locale={locale} />
      </div>
    </>
  );
}
