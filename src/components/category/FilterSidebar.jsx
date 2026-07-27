import { SlidersHorizontal, RotateCcw } from "lucide-react";

export default function FilterSidebar({
  products,
  priceFilter,
  setPriceFilter,

  selectedBrands,
  setSelectedBrands,

  selectedSkinTypes,
  setSelectedSkinTypes,

  selectedRating,
  setSelectedRating,

  inStockOnly,
  setInStockOnly,

  clearFilters,
}) {
  const brands = [...new Set(products.map((p) => p.brand))];

  const skinTypes = [...new Set(products.map((p) => p.skinType))];

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
  };

  const toggleSkinType = (type) => {
    setSelectedSkinTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

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

        {/* Brand */}

        <div className="mb-8">
          <h3 className="mb-3 font-semibold">Brand</h3>

          <div className="space-y-2">
            {brands.map((brand) => (
              <label
                key={brand}
                className="flex cursor-pointer items-center gap-2"
              >
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                />

                {brand}
              </label>
            ))}
          </div>
        </div>

        {/* Skin Type */}

        <div className="mb-8">
          <h3 className="mb-3 font-semibold">Skin Type</h3>

          <div className="space-y-2">
            {skinTypes.map((type) => (
              <label
                key={type}
                className="flex cursor-pointer items-center gap-2"
              >
                <input
                  type="checkbox"
                  checked={selectedSkinTypes.includes(type)}
                  onChange={() => toggleSkinType(type)}
                />

                {type}
              </label>
            ))}
          </div>
        </div>

        {/* Rating */}

        <div className="mb-8">
          <h3 className="mb-3 font-semibold">Minimum Rating</h3>

          <select
            value={selectedRating}
            onChange={(e) => setSelectedRating(Number(e.target.value))}
            className="w-full rounded-lg border p-2"
          >
            <option value={0}>All Ratings</option>
            <option value={5}>★★★★★</option>
            <option value={4}>★★★★☆ & Up</option>
            <option value={3}>★★★☆☆ & Up</option>
          </select>
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

        {/* Clear Button */}

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
