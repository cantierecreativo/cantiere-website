import Icon from "components/layout/Icon";

export default function Button({ label, bg }) {
  const colorButton = {
    blue: "bg-blue fill-white",
    black: "bg-black fill-white",
    white: "bg-white fill-black",
    border: "bg-white border border-black fill-black",
  };
  return (
    <>
      <div className="flex gap-4 items-center">
        {label && <span className="">{label}</span>}
        {bg !== null && (
          <div className={`${colorButton[bg]} px-5 rounded-full py-2`}>
            <Icon name="arrow" className="" size="22" />
          </div>
        )}
      </div>
    </>
  );
}
