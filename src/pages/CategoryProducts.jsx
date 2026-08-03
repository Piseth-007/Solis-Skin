import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Grid3X3, List, Search } from "lucide-react";

import { getCategoryById } from "../api/categoryApi";
import { getProducts } from "../api/productApi";

import ProductCard from "../components/common/ProductCard";
import ProductListCard from "../components/common/ProductListCard";
import FilterSidebar from "../components/category/FilterSidebar";

export default function CategoryProducts() {
  const { id } = useParams();

  const [category, setCategory] = useState(null);
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
      const categoryData = await getCategoryById(id);
      const productData = await getProducts();

      setCategory(categoryData);

      const categoryProducts = productData.filter(
        (product) => product.categoryId === categoryData.id,
      );

      setProducts(categoryProducts);
    } catch (error) {
      console.error("Failed to load category products:", error);
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

    // Price
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

    // Stock
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

  if (!category) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl font-bold">Category Not Found</h1>
      </div>
    );
  }
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="text-sm text-gray-500">
            <Link to="/" className="hover:text-rose-600">
              Home
            </Link>

            <span className="mx-2">/</span>

            <Link to="/categories" className="hover:text-rose-600">
              Categories
            </Link>

            <span className="mx-2">/</span>

            <span>{category.name}</span>
          </div>

          <h1 className="mt-4 text-5xl font-bold">{category.name}</h1>

          <p className="mt-4 max-w-2xl text-gray-500">
            {category.description ||
              "Discover premium skincare products in this category."}
          </p>
        </div>
      </section>

      {/* Content */}
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
                <div>
                  <h2 className="text-xl font-bold">
                    {filteredProducts.length} Products
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Browse products in {category.name}.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  {/* Search */}
                  <div className="relative">
                    <Search
                      size={18}
                      className="absolute left-3 top-3 text-gray-400"
                    />

                    <input
                      type="text"
                      placeholder="Search products..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="rounded-xl border py-2 pl-10 pr-4 focus:border-rose-500 focus:outline-none"
                    />
                  </div>

                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded-xl border px-4 focus:border-rose-500 focus:outline-none"
                  >
                    <option value="default">Featured</option>
                    <option value="price-low">Price: Low → High</option>
                    <option value="price-high">Price: High → Low</option>
                    <option value="name">Name A-Z</option>
                  </select>

                  {/* View */}
                  <div className="flex overflow-hidden rounded-xl border">
                    <button
                      onClick={() => setView("grid")}
                      className={`p-2 transition ${
                        view === "grid" ? "bg-rose-600 text-white" : "bg-white"
                      }`}
                    >
                      <Grid3X3 size={18} />
                    </button>

                    <button
                      onClick={() => setView("list")}
                      className={`p-2 transition ${
                        view === "list" ? "bg-rose-600 text-white" : "bg-white"
                      }`}
                    >
                      <List size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length === 0 ? (
              <div className="rounded-2xl bg-white py-20 text-center shadow-sm">
                <h3 className="text-2xl font-bold">No Products Found</h3>

                <p className="mt-3 text-gray-500">
                  Try changing your search or filters.
                </p>

                <button
                  onClick={clearFilters}
                  className="mt-6 rounded-full bg-rose-600 px-6 py-3 text-white transition hover:bg-rose-700"
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
