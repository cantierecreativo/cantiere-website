import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";

export default function Pagination({
  handleChangePage,
  totals,
  pageSize,
  currentPage,
}) {
  const totalPages = Math.ceil(totals / pageSize);
  const pages = [...Array(totalPages).keys()];
  return (
    <div>
      <nav
        className="relative z-0 inline-flex space-x-2"
        aria-label="Pagination"
      >
        <button
          onClick={
            currentPage > 0 ? () => handleChangePage(currentPage - 1) : null
          }
          className={`${
            currentPage > 0
              ? "duration-300 hover:border-gray hover:bg-gray-50"
              : "cursor-auto opacity-30"
          } relative inline-flex items-center border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-dark-500`}
        >
          <span className="sr-only">Previous</span>
          <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
        </button>
        {pages.map((p, index) => {
          return (
            <button
              key={p}
              className={`${
                index == currentPage
                  ? "border-black bg-black text-white"
                  : "border-gray-300 bg-white text-black hover:bg-gray-50"
              } relative inline-flex items-center border px-4 py-2 text-xs font-medium hover:border-gray`}
              onClick={() => handleChangePage(p)}
            >
              {p + 1}
            </button>
          );
        })}
        <button
          onClick={
            Number(currentPage) + 1 < totalPages
              ? () => handleChangePage(Number(currentPage) + 1)
              : null
          }
          className={`${
            Number(currentPage) + 1 < totalPages
              ? "duration-300 hover:border-gray hover:bg-gray-50"
              : "cursor-auto opacity-30"
          } relative inline-flex items-center border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-dark-500`}
        >
          <span className="sr-only">Next</span>
          <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
        </button>
      </nav>
    </div>
  );
}
