import Icon from "components/layout/Icon";

export default function Button({ label, bg, reverse = false }) {
  const colorButton = {
    blue: "after:bg-blue border-blue fill-white group-hover:fill-blue group-hover:after:top-full after:bottom-0",
    black:
      "after:bg-black border-black fill-white group-hover:fill-black group-hover:after:top-full after:bottom-0",
    white:
      "after:bg-white border-white fill-black group-hover:fill-white group-hover:after:top-full after:bottom-0",
    border:
      "after:bg-violet border-black fill-black group-hover:fill-white group-hover:after:bottom-0 after:bottom-full",
  };
  return (
    <>
      <div className="flex gap-4 items-center">
        {label && <span className="cursor-pointer">{label}</span>}
        {bg !== null && (
          <div
            className={`${colorButton[bg]} px-5 cursor-pointer rounded-full py-2 border duration-300 after:z-0 after:absolute after:left-0 after:right-0 after:top-0 relative after:duration-300 overflow-hidden`}
          >
            <Icon
              name="arrow"
              className={`${reverse ? "rotate-180" : ""} z-10 relative`}
              size="22"
            />
          </div>
        )}
      </div>
    </>
  );
}
