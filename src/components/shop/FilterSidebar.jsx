import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";

import { getCategories } from "../../api/categoryApi";
import { getBrands } from "../../api/brandApi";

export default function FilterSidebar({
  category,
  setCategory,
  brand,
  setBrand,
  maxPrice,
  setMaxPrice,
  resetFilters,
}) {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();

      // Support both paginated and normal array responses
      if (Array.isArray(data)) {
        setCategories(data);
      } else {
        setCategories(data.content || []);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const fetchBrands = async () => {
    try {
      const data = await getBrands();

      if (Array.isArray(data)) {
        setBrands(data);
      } else {
        setBrands(data.content || []);
      }
    } catch (error) {
      console.error("Failed to fetch brands:", error);
    }
  };

  const toggleCategory = (name) => {
    if (category.includes(name)) {
      setCategory(category.filter((item) => item !== name));
    } else {
      setCategory([...category, name]);
    }
  };

  const toggleBrand = (name) => {
    if (brand.includes(name)) {
      setBrand(brand.filter((item) => item !== name));
    } else {
      setBrand([...brand, name]);
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
          {categories.length === 0 ? (
            <p className="text-sm text-gray-500">No categories</p>
          ) : (
            categories.map((item) => (
              <label
                key={item.id}
                className="flex cursor-pointer items-center gap-3"
              >
                <input
                  type="checkbox"
                  checked={category.includes(item.name)}
                  onChange={() => toggleCategory(item.name)}
                  className="h-4 w-4 rounded accent-rose-500"
                />

                <span>{item.name}</span>
              </label>
            ))
          )}
        </div>
      </div>

      {/* Brand */}
      <div className="mt-10">
        <h3 className="mb-4 font-semibold">Brand</h3>

        <div className="space-y-3">
          {brands.length === 0 ? (
            <p className="text-sm text-gray-500">No brands</p>
          ) : (
            brands.map((item) => (
              <label
                key={item.id}
                className="flex cursor-pointer items-center gap-3"
              >
                <input
                  type="checkbox"
                  checked={brand.includes(item.name)}
                  onChange={() => toggleBrand(item.name)}
                  className="h-4 w-4 rounded accent-rose-500"
                />

                <span>{item.name}</span>
              </label>
            ))
          )}
        </div>
      </div>

      {/* Price */}
      <div className="mt-10">
        <h3 className="mb-4 font-semibold">Maximum Price</h3>

        <input
          type="range"
          min="0"
          max="500"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-rose-500"
        />

        <div className="mt-2 flex justify-between text-sm text-gray-500">
          <span>$0</span>
          <span>${maxPrice}</span>
        </div>
      </div>
    </aside>
  );
}
