import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Grid3X3, List, Search } from "lucide-react";

import { getBrandById } from "../api/brandApi";
import { getProducts } from "../api/productApi";

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
      const brandData = await getBrandById(id);
      const productData = await getProducts();

      setBrand(brandData);

      const brandProducts = productData.filter(
        (product) => product.brandId === brandData.id,
      );

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

    // Search
    if (search.trim()) {
      data = data.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Price Filter
    switch (priceFilter) {
      case "under20":
        data = data.filter((p) => p.price < 20);
        break;

      case "20to50":
        data = data.filter((p) => p.price >= 20 && p.price <= 50);
        break;

      case "over50":
        data = data.filter((p) => p.price > 50);
        break;

      default:
        break;
    }

    // Stock Filter
    if (inStockOnly) {
      data = data.filter((p) => p.stock > 0);
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        data.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        data.sort((a, b) => b.price - a.price);
        break;

      case "name":
        data.sort((a, b) => a.name.localeCompare(b.name));
        break;

      default:
        break;
    }

    return data;
  }, [products, search, priceFilter, inStockOnly, sortBy]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl font-bold">Brand Not Found</h1>
      </div>
    );
  }
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <img
              src={`http://localhost:8080${brand.logoUrl}`}
              alt={brand.name}
              className="h-24 w-24 object-contain"
            />

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

      {/* Content */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-4">
          <FilterSidebar
            priceFilter={priceFilter}
            setPriceFilter={setPriceFilter}
            inStockOnly={inStockOnly}
            setInStockOnly={setInStockOnly}
            clearFilters={clearFilters}
          />

          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="mb-8 flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
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
                    onClick={() => setView("grid")}
                    className={`p-3 ${
                      view === "grid" ? "bg-rose-600 text-white" : "bg-white"
                    }`}
                  >
                    <Grid3X3 size={18} />
                  </button>

                  <button
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
