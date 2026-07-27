import { RotateCcw } from "lucide-react";

export default function FilterSidebar({
  category,
  setCategory,
  brand,
  setBrand,
  skinType,
  setSkinType,
  maxPrice,
  setMaxPrice,
  rating,
  setRating,
  resetFilters,
}) {
  const categories = ["Cleanser", "Toner", "Serum", "Moisturizer", "Sunscreen"];

  const brands = [
    "CeraVe",
    "COSRX",
    "Anua",
    "Beauty of Joseon",
    "The Ordinary",
  ];

  const skinTypes = ["Dry", "Oily", "Combination", "Sensitive"];

  const toggleCategory = (item) => {
    if (category.includes(item)) {
      setCategory(category.filter((c) => c !== item));
    } else {
      setCategory([...category, item]);
    }
  };

  const toggleBrand = (item) => {
    if (brand.includes(item)) {
      setBrand(brand.filter((b) => b !== item));
    } else {
      setBrand([...brand, item]);
    }
  };

  return (
    <aside className="sticky top-28 h-fit rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header */}

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Filters</h2>

        <button
          onClick={resetFilters}
          className="flex items-center gap-2 text-sm text-rose-600 hover:underline"
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>

      {/* Category */}

      <div className="mt-8">
        <h3 className="mb-4 font-semibold">Category</h3>

        <div className="space-y-3">
          {categories.map((item) => (
            <label
              key={item}
              className="flex cursor-pointer items-center gap-3"
            >
              <input
                type="checkbox"
                checked={category.includes(item)}
                onChange={() => toggleCategory(item)}
                className="h-4 w-4 rounded accent-rose-500"
              />

              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brand */}

      <div className="mt-10">
        <h3 className="mb-4 font-semibold">Brand</h3>

        <div className="space-y-3">
          {brands.map((item) => (
            <label
              key={item}
              className="flex cursor-pointer items-center gap-3"
            >
              <input
                type="checkbox"
                checked={brand.includes(item)}
                onChange={() => toggleBrand(item)}
                className="h-4 w-4 rounded accent-rose-500"
              />

              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Skin Type */}

      <div className="mt-10">
        <h3 className="mb-4 font-semibold">Skin Type</h3>

        <select
          value={skinType}
          onChange={(e) => setSkinType(e.target.value)}
          className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-rose-500"
        >
          <option value="">All Skin Types</option>

          {skinTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Price */}

      <div className="mt-10">
        <h3 className="mb-4 font-semibold">Max Price</h3>

        <input
          type="range"
          min="0"
          max="120"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-rose-500"
        />

        <div className="mt-2 flex justify-between text-sm text-gray-500">
          <span>$0</span>

          <span>${maxPrice}</span>
        </div>
      </div>

      {/* Rating */}

      <div className="mt-10">
        <h3 className="mb-4 font-semibold">Minimum Rating</h3>

        <div className="space-y-3">
          {[5, 4, 3].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              className={`block w-full rounded-xl border p-3 text-left transition ${
                rating === value
                  ? "border-rose-500 bg-rose-50"
                  : "hover:border-rose-500"
              }`}
            >
              {"★".repeat(value)}
              {"☆".repeat(5 - value)}
            </button>
          ))}
        </div>
      </div>

      {/* Availability */}

      <div className="mt-10">
        <h3 className="mb-4 font-semibold">Availability</h3>

        <label className="flex items-center gap-3">
          <input type="checkbox" />

          <span>In Stock</span>
        </label>

        <label className="mt-3 flex items-center gap-3">
          <input type="checkbox" />

          <span>On Sale</span>
        </label>
      </div>
    </aside>
  );
}
