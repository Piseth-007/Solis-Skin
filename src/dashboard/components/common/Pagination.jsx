import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-5 sm:flex-row">
      <p className="text-sm text-slate-500">
        Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
      </p>

      <div className="flex items-center gap-2">
        {/* Previous */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft size={18} />
          Previous
        </button>

        {/* Pages */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`h-10 w-10 rounded-xl text-sm font-semibold transition ${
              page === currentPage
                ? "bg-pink-600 text-white"
                : "border border-slate-200 bg-white hover:bg-slate-100"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
