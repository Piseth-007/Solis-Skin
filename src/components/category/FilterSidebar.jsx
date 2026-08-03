import { SlidersHorizontal, RotateCcw } from "lucide-react";

export default function FilterSidebar({
  priceFilter,
  setPriceFilter,

  inStockOnly,
  setInStockOnly,

  clearFilters,
}) {
  return (
    <aside className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={18} />
            <h2 className="text-lg font-bold">Filters</h2>
          </div>

          <button
            onClick={clearFilters}
            className="text-rose-600 hover:text-rose-700"
          >
            <RotateCcw size={18} />
          </button>
        </div>

        {/* Price */}
        <div className="mb-8">
          <h3 className="mb-3 font-semibold">Price</h3>

          <div className="space-y-2">
            {[
              ["all", "All"],
              ["under20", "Under $20"],
              ["20to50", "$20 - $50"],
              ["over50", "Over $50"],
            ].map(([value, label]) => (
              <label
                key={value}
                className="flex cursor-pointer items-center gap-2"
              >
                <input
                  type="radio"
                  checked={priceFilter === value}
                  onChange={() => setPriceFilter(value)}
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* Stock */}
        <div className="mb-8">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
            />
            In Stock Only
          </label>
        </div>

        {/* Clear */}
        <button
          onClick={clearFilters}
          className="w-full rounded-xl bg-rose-600 py-3 font-semibold text-white transition hover:bg-rose-700"
        >
          Clear Filters
        </button>
      </div>
    </aside>
  );
}
