import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Grid3X3, List, Search, Loader2 } from "lucide-react";

import { getBrandById } from "../api/brandApi";
import { getProducts, getProductList, toProductView } from "../api/productApi";

import ProductCard from "../components/common/ProductCard";
import ProductListCard from "../components/common/ProductListCard";
import FilterSidebar from "../components/category/FilterSidebar";

export default function BrandProducts() {
  const { id } = useParams();

  const [brand, setBrand] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [view, setView] = useState("grid");

  const [priceFilter, setPriceFilter] = useState("all");
  const [inStockOnly, setInStockOnly] = useState(false);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      setLoading(true);

      const brandData = await getBrandById(id);

      // Get first page
      const productResponse = await getProducts(0, 100);

      console.log("Brand:", brandData);
      console.log("Products Response:", productResponse);

      setBrand(brandData);

      // Handle Spring Boot Page response
      const rawProducts = getProductList(productResponse);

      console.log("Raw Products:", rawProducts);

      // Convert backend products to frontend products
      const convertedProducts = rawProducts.map(toProductView);

      console.log("Converted Products:", convertedProducts);

      // Filter by brand
      const brandProducts = convertedProducts.filter(
        (product) => Number(product.brandId) === Number(brandData.id),
      );

      console.log("Filtered Brand Products:", brandProducts);

      setProducts(brandProducts);
    } catch (error) {
      console.error("Failed to load brand products:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSearch("");
    setSortBy("default");
    setPriceFilter("all");
    setInStockOnly(false);
  };

  const filteredProducts = useMemo(() => {
    let data = [...products];

    // =========================
    // Search
    // =========================

    if (search.trim()) {
      const keyword = search.toLowerCase().trim();

      data = data.filter((product) =>
        product.name.toLowerCase().includes(keyword),
      );
    }

    // =========================
    // Price Filter
    // =========================

    switch (priceFilter) {
      case "under20":
        data = data.filter((product) => Number(product.price) < 20);
        break;

      case "20to50":
        data = data.filter(
          (product) =>
            Number(product.price) >= 20 && Number(product.price) <= 50,
        );
        break;

      case "over50":
        data = data.filter((product) => Number(product.price) > 50);
        break;

      default:
        break;
    }

    // =========================
    // Stock
    // =========================

    if (inStockOnly) {
      data = data.filter((product) => Number(product.stock) > 0);
    }

    // =========================
    // Sort
    // =========================

    switch (sortBy) {
      case "price-low":
        data.sort((a, b) => Number(a.price) - Number(b.price));
        break;

      case "price-high":
        data.sort((a, b) => Number(b.price) - Number(a.price));
        break;

      case "name":
        data.sort((a, b) => a.name.localeCompare(b.name));
        break;

      default:
        break;
    }

    return data;
  }, [products, search, priceFilter, inStockOnly, sortBy]);

  // =========================
  // Loading
  // =========================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-rose-600" />

          <p className="text-gray-500">Loading products...</p>
        </div>
      </div>
    );
  }

  // =========================
  // Brand Not Found
  // =========================

  if (!brand) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Brand Not Found</h1>

          <Link
            to="/brands"
            className="mt-6 inline-block rounded-full bg-rose-600 px-6 py-3 font-semibold text-white"
          >
            Back to Brands
          </Link>
        </div>
      </div>
    );
  }

  // =========================
  // Brand Logo
  // =========================

  const brandLogo = brand.logoUrl
    ? brand.logoUrl.startsWith("http")
      ? brand.logoUrl
      : `http://localhost:8080${brand.logoUrl}`
    : "/placeholder.png";

  return (
    <main className="min-h-screen bg-gray-50">
      {/* =========================
          Hero
      ========================= */}

      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            {/* Brand Logo */}

            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border bg-white">
              <img
                src={brandLogo}
                alt={brand.name}
                className="h-full w-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.png";
                }}
              />
            </div>

            {/* Brand Info */}

            <div className="flex-1">
              <div className="text-sm text-gray-500">
                <Link to="/" className="hover:text-rose-600">
                  Home
                </Link>

                <span className="mx-2">/</span>

                <Link to="/brands" className="hover:text-rose-600">
                  Brands
                </Link>

                <span className="mx-2">/</span>

                <span>{brand.name}</span>
              </div>

              <h1 className="mt-2 text-4xl font-bold md:text-5xl">
                {brand.name}
              </h1>

              <p className="mt-4 max-w-2xl text-gray-500">
                {brand.description ||
                  "Premium skincare products from this brand."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          Content
      ========================= */}

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-4">
          {/* Sidebar */}

          <FilterSidebar
            priceFilter={priceFilter}
            setPriceFilter={setPriceFilter}
            inStockOnly={inStockOnly}
            setInStockOnly={setInStockOnly}
            clearFilters={clearFilters}
          />

          {/* Products */}

          <div className="lg:col-span-3">
            {/* Toolbar */}

            <div className="mb-8 rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                {/* Search */}

                <div className="relative w-full md:max-w-md">
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 focus:border-rose-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-4">
                  {/* Sort */}

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded-xl border border-gray-200 px-4 py-3"
                  >
                    <option value="default">Default</option>

                    <option value="name">Name</option>

                    <option value="price-low">Price: Low → High</option>

                    <option value="price-high">Price: High → Low</option>
                  </select>

                  {/* Grid/List */}

                  <div className="flex overflow-hidden rounded-xl border border-gray-200">
                    <button
                      type="button"
                      onClick={() => setView("grid")}
                      className={`p-3 ${
                        view === "grid" ? "bg-rose-600 text-white" : "bg-white"
                      }`}
                    >
                      <Grid3X3 size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() => setView("list")}
                      className={`p-3 ${
                        view === "list" ? "bg-rose-600 text-white" : "bg-white"
                      }`}
                    >
                      <List size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}

            <div className="mb-6 text-gray-500">
              Showing {filteredProducts.length} product
              {filteredProducts.length !== 1 ? "s" : ""}
            </div>

            {/* Empty */}

            {filteredProducts.length === 0 ? (
              <div className="rounded-2xl bg-white py-20 text-center shadow-sm">
                <h2 className="text-2xl font-bold text-gray-700">
                  No products found
                </h2>

                <p className="mt-3 text-gray-500">
                  Try changing your filters or search keyword.
                </p>

                <button
                  onClick={clearFilters}
                  className="mt-6 rounded-full bg-rose-600 px-6 py-3 text-white hover:bg-rose-700"
                >
                  Clear Filters
                </button>
              </div>
            ) : view === "grid" ? (
              <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredProducts.map((product) => (
                  <ProductListCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
