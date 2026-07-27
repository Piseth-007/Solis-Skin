import { Search, SlidersHorizontal, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ShopHeader({
  totalProducts = 128,
  onFilterClick,
  search,
  setSearch,
  sort,
  setSort,
}) {
  return (
    <header className="border-b bg-white">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="transition hover:text-rose-500">
            Home
          </Link>

          <ChevronRight size={14} />

          <span className="font-medium text-rose-600">Shop</span>
        </div>

        {/* Title + Search */}
        <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          {/* Left */}
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900">
              Shop Skincare
            </h1>

            <p className="mt-3 text-lg leading-8 text-gray-500">
              Explore premium skincare products carefully selected for every
              skin type and concern.
            </p>
          </div>

          {/* Right */}
          <div className="w-full lg:w-105">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="
                  h-12
                  w-full
                  rounded-full
                  border
                  border-gray-200
                  bg-gray-50
                  pl-12
                  pr-5
                  text-sm
                  outline-none
                  transition-all
                  duration-300
                  focus:border-rose-500
                  focus:bg-white
                  focus:shadow-lg
                "
              />
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Product Count */}
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="mx-1 font-semibold text-gray-900">
              {totalProducts}
            </span>{" "}
            Products
          </p>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onFilterClick}
              className="
                flex
                h-11
                items-center
                gap-2
                rounded-full
                border
                border-gray-200
                bg-white
                px-5
                text-sm
                font-medium
                transition-all
                duration-300
                hover:border-rose-500
                hover:text-rose-600
              "
            >
              <SlidersHorizontal size={18} />
              Filters
            </button>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="
                h-11
                rounded-full
                border
                border-gray-200
                bg-white
                px-5
                text-sm
                outline-none
                transition-all
                duration-300
                hover:border-rose-500
                focus:border-rose-500
              "
            >
              <option value="best">Best Selling</option>
              <option value="newest">Newest</option>
              <option value="low">Price: Low → High</option>
              <option value="high">Price: High → Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
