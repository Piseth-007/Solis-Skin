import { Search, Plus, Filter, RotateCcw } from "lucide-react";

export default function ProductToolbar({
  keyword,
  setKeyword,
  category,
  setCategory,
  brand,
  setBrand,
  status,
  setStatus,
  onSearch,
  onReset,
  onAdd,
  categories,
  brands,
}) {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Product Management
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage products, pricing, stock, and categories.
          </p>
        </div>

        <div className="flex gap-3">
          

          <button
            onClick={onAdd}
            className="flex items-center gap-2 rounded-lg bg-pink-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-700"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-5">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search products..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
            />
          </div>

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>

            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          {/* Brand */}
          <select value={brand} onChange={(e) => setBrand(e.target.value)}>
            <option value="">All Brands</option>

            {brands.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          {/* Status */}
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="DRAFT">Draft</option>
          </select>
        </div>

        {/* Bottom Actions */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 pt-4">
          <div className="text-sm text-gray-500">
            Filter and search products quickly.
          </div>

          <div className="flex gap-3">
            <button onClick={onReset} className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-100">
              <RotateCcw size={17} />
              Reset
            </button>

            <button onClick={onSearch} className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-black">
              <Filter size={17} />
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
