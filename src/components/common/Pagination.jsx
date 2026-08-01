import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  page,
  totalPages,
  totalElements,
  size,
  onPageChange,
  onSizeChange,
}) {
  const start = totalElements === 0 ? 0 : page * size + 1;
  const end = Math.min((page + 1) * size, totalElements);

  return (
    <div className="mt-6 flex flex-col gap-4 border-t pt-4 md:flex-row md:items-center md:justify-between">
      <p className="text-sm text-gray-500">
        Showing <span className="font-medium">{start}</span> -{" "}
        <span className="font-medium">{end}</span> of{" "}
        <span className="font-medium">{totalElements}</span> products
      </p>

      <div className="flex items-center gap-4">
        <select
          value={size}
          onChange={(e) => onSizeChange(Number(e.target.value))}
          className="rounded-lg border px-3 py-2 text-sm"
        >
          <option value={10}>10 / page</option>
          <option value={20}>20 / page</option>
          <option value={50}>50 / page</option>
          <option value={100}>100 / page</option>
        </select>

        <div className="flex items-center gap-2">
          <button
            disabled={page === 0}
            onClick={() => onPageChange(page - 1)}
            className="rounded-lg border p-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft size={18} />
          </button>

          <span className="px-2 text-sm font-medium">
            Page {page + 1} of {Math.max(totalPages, 1)}
          </span>

          <button
            disabled={page + 1 >= totalPages}
            onClick={() => onPageChange(page + 1)}
            className="rounded-lg border p-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
