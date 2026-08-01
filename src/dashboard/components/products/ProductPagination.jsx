import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductPagination({
  page,
  size,
  totalPages,
  totalElements,
  setPage,
  setSize,
}) {
  const start = totalElements === 0 ? 0 : page * size + 1;
  const end = Math.min((page + 1) * size, totalElements);

  const pages = [];

  let first = Math.max(0, page - 2);
  let last = Math.min(totalPages - 1, page + 2);

  for (let i = first; i <= last; i++) {
    pages.push(i);
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      {/* Left */}
      <div className="text-sm text-gray-500">
        Showing <span className="font-semibold text-gray-800">{start}</span> -
        <span className="font-semibold text-gray-800"> {end}</span> of{" "}
        <span className="font-semibold text-gray-800">{totalElements}</span>{" "}
        products
      </div>

      {/* Right */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Page Size */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Rows</span>

          <select
            value={size}
            onChange={(e) => {
              setSize(Number(e.target.value));
              setPage(0);
            }}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-pink-500"
          >
            <option value={10}>10</option>

            <option value={20}>20</option>

            <option value={50}>50</option>

            <option value={100}>100</option>
          </select>
        </div>

        {/* Previous */}
        <button
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
          className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft size={18} />
          Previous
        </button>

        {/* Page Numbers */}
        <div className="flex gap-2">
          {pages.map((item) => (
            <button
              key={item}
              onClick={() => setPage(item)}
              className={`h-10 w-10 rounded-lg text-sm font-semibold transition ${
                page === item
                  ? "bg-pink-600 text-white"
                  : "border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {item + 1}
            </button>
          ))}
        </div>

        {/* Next */}
        <button
          disabled={page === totalPages - 1}
          onClick={() => setPage(page + 1)}
          className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
