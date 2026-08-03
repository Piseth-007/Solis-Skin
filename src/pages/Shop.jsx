import { useEffect, useMemo, useState } from "react";

import { getProducts } from "../api/productApi";

import ShopHeader from "../components/shop/ShopHeader";
import FilterSidebar from "../components/shop/FilterSidebar";
import ProductGrid from "../components/shop/ProductGrid";
import Pagination from "../components/shop/Pagination";

export default function Shop() {
  const PRODUCTS_PER_PAGE = 8;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search
  const [search, setSearch] = useState("");

  // Sort
  const [sort, setSort] = useState("best");

  // Filters
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [maxPrice, setMaxPrice] = useState(500);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Mobile Drawer
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await getProducts(0, 100);

      const mappedProducts = (response.content || []).map((item) => ({
        ...item,

        // Full image URL
        imageUrl: item.imageUrl
          ? `http://localhost:8080${item.imageUrl}`
          : "/placeholder.png",

        // Keep compatibility with ProductCard
        image: item.imageUrl
          ? `http://localhost:8080${item.imageUrl}`
          : "/placeholder.png",

        brand: item.brandName,
        category: item.categoryName,

        // Default values used by ProductCard
        rating: item.rating ?? 5,
        reviewCount: item.reviewCount ?? 0,
        discount: item.discount ?? 0,
        oldPrice: item.oldPrice ?? null,
        isNew: item.isNew ?? false,
        skinType: item.skinType ?? "",
      }));

      setProducts(mappedProducts);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Reset page whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, sort, category, brand, maxPrice]);

  const resetFilters = () => {
    setCategory([]);
    setBrand([]);
    setMaxPrice(500);
  };

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
      result = result.filter((product) =>
        category.includes(product.category?.name || product.categoryName),
      );
    }

    // Brand
    if (brand.length) {
      result = result.filter((product) =>
        brand.includes(product.brand?.name || product.brandName),
      );
    }

    // Price
    result = result.filter((product) => Number(product.price) <= maxPrice);

    // Sort
    switch (sort) {
      case "low":
        result.sort((a, b) => a.price - b.price);
        break;

      case "high":
        result.sort((a, b) => b.price - a.price);
        break;

      case "newest":
        result.sort((a, b) => b.id - a.id);
        break;

      default:
        break;
    }

    return result;
  }, [products, search, sort, category, brand, maxPrice]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );

  if (loading) {
    return (
      <div className="flex h-125 items-center justify-center">
        <p className="text-lg text-gray-500">Loading products...</p>
      </div>
    );
  }

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
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                resetFilters={resetFilters}
              />
            </div>

            {/* Products */}
            <div>
              <ProductGrid products={currentProducts} />

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
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
