import { useEffect, useMemo, useState } from "react";

import products from "../data/products";

import ShopHeader from "../components/shop/ShopHeader";
import FilterSidebar from "../components/shop/FilterSidebar";
import ProductGrid from "../components/shop/ProductGrid";
import Pagination from "../components/shop/Pagination";

export default function Shop() {
  const PRODUCTS_PER_PAGE = 8;

  // Search
  const [search, setSearch] = useState("");

  // Sort
  const [sort, setSort] = useState("best");

  // Filters
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [skinType, setSkinType] = useState("");
  const [rating, setRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(120);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Mobile Drawer
  const [showFilters, setShowFilters] = useState(false);

  // Reset page whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, sort, category, brand, skinType, rating, maxPrice]);

  // Reset Filters
  const resetFilters = () => {
    setCategory([]);
    setBrand([]);
    setSkinType("");
    setRating(0);
    setMaxPrice(120);
  };

  // Filter Products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (search.trim()) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Category
    if (category.length) {
      result = result.filter((product) => category.includes(product.category));
    }

    // Brand
    if (brand.length) {
      result = result.filter((product) => brand.includes(product.brand));
    }

    // Skin Type
    if (skinType) {
      result = result.filter((product) => product.skinType === skinType);
    }

    // Price
    result = result.filter((product) => product.price <= maxPrice);

    // Rating
    if (rating > 0) {
      result = result.filter((product) => product.rating >= rating);
    }

    // Sort
    switch (sort) {
      case "low":
        result.sort((a, b) => a.price - b.price);
        break;

      case "high":
        result.sort((a, b) => b.price - a.price);
        break;

      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;

      case "newest":
        result.sort((a, b) => b.id - a.id);
        break;

      default:
        break;
    }

    return result;
  }, [search, sort, category, brand, skinType, rating, maxPrice]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );

  return (
    <>
      <ShopHeader
        totalProducts={filteredProducts.length}
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
        onFilterClick={() => setShowFilters(true)}
      />

      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
              <FilterSidebar
                category={category}
                setCategory={setCategory}
                brand={brand}
                setBrand={setBrand}
                skinType={skinType}
                setSkinType={setSkinType}
                rating={rating}
                setRating={setRating}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                resetFilters={resetFilters}
              />
            </div>

            {/* Product Grid */}
            <div>
              <ProductGrid products={currentProducts} />

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filter */}
      {showFilters && (
        <div className="fixed inset-0 z-50 bg-black/40 lg:hidden">
          <div className="absolute right-0 top-0 h-full w-80 overflow-y-auto bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">Filters</h2>

              <button
                onClick={() => setShowFilters(false)}
                className="text-2xl"
              >
                ×
              </button>
            </div>

            <FilterSidebar
              category={category}
              setCategory={setCategory}
              brand={brand}
              setBrand={setBrand}
              skinType={skinType}
              setSkinType={setSkinType}
              rating={rating}
              setRating={setRating}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              resetFilters={resetFilters}
            />
          </div>
        </div>
      )}
    </>
  );
}
