import Icon from "components/layout/Icon";

export default function Button({
  label,
  bg,
  big = false,
  reverse = false,
  icon = "white",
}) {
  const colorButton = {
    blue: "after:bg-blue border-blue fill-white group-hover:fill-blue group-hover:after:top-full after:bottom-0",
    blueWhite:
      "after:bg-blue border-blue fill-white group-hover:fill-blue group-hover:after:top-full after:bottom-0 before:absolute before:left-0 before:top-0 before:right-0 before:bottom-0 before:bg-white group-hover:before:bottom-0",
    black:
      "after:bg-black border-black fill-white group-hover:fill-black group-hover:after:top-full after:bottom-0",
    white:
      "after:bg-white border-white fill-black group-hover:fill-white group-hover:after:top-full after:bottom-0",
    border:
      "after:bg-violet border-black fill-black group-hover:fill-white group-hover:after:bottom-0 after:bottom-full",
  };
  const bgButton = {
    blue: "bg-blue/60 text-white",
  };
  return big ? (
    <>
      <div
        className={`${bgButton[bg]} flex w-full items-center justify-center gap-4 rounded-full px-12 py-3`}
      >
        {label && (
          <span className="cursor-pointer whitespace-nowrap uppercase font-serif font-bold">
            {label}
          </span>
        )}
        <Icon
          name="arrow"
          className={`${reverse ? "rotate-180" : ""} z-10 relative`}
          size="24"
        />
      </div>
    </>
  ) : (
    <>
      <div className="flex gap-4 items-center">
        {label && <span className="cursor-pointer">{label}</span>}
        {bg !== null && (
          <div
            className={`${colorButton[bg]} px-5 cursor-pointer rounded-full py-2 border duration-300 after:z-0 after:absolute after:left-0 after:right-0 after:top-0 relative after:duration-300 overflow-hidden`}
          >
            <Icon
              name="arrow"
              className={`${
                reverse ? "rotate-180" : ""
              } z-10 relative fill-${icon}`}
              size="22"
            />
          </div>
        )}
      </div>
    </>
  );
}
