import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Grid3X3, List, Search, Loader2 } from "lucide-react";

import { getCategories } from "../api/categoryApi";
import { getAllProducts } from "../api/productApi";

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

  // ============================
  // Load Data
  // ============================

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      setLoading(true);

      console.log("==============================");

      console.log("CATEGORY URL ID:", id);

      // ============================
      // Get Categories
      // ============================

      const categories = await getCategories();

      console.log("ALL CATEGORIES:", categories);

      const categoryData = categories.find(
        (category) => Number(category.id) === Number(id),
      );

      console.log("SELECTED CATEGORY:", categoryData);

      if (!categoryData) {
        console.error("CATEGORY NOT FOUND:", id);

        setCategory(null);
        setProducts([]);

        return;
      }

      setCategory(categoryData);

      // ============================
      // Get ALL Products
      // ============================

      const allProducts = await getAllProducts();

      console.log("ALL PRODUCTS AFTER CONVERSION:", allProducts);

      // ============================
      // Filter Category
      // ============================

      const categoryProducts = allProducts.filter(
        (product) => Number(product.categoryId) === Number(categoryData.id),
      );

      console.log("CATEGORY ID:", categoryData.id);

      console.log("CATEGORY PRODUCTS:", categoryProducts);

      setProducts(categoryProducts);
    } catch (error) {
      console.error("FAILED TO LOAD CATEGORY:", error);

      setCategory(null);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // Clear Filters
  // ============================

  const clearFilters = () => {
    setSearch("");
    setSortBy("default");
    setPriceFilter("all");
    setInStockOnly(false);
  };

  // ============================
  // Filter Products
  // ============================

  const filteredProducts = useMemo(() => {
    let data = [...products];

    // Search
    if (search.trim()) {
      const searchText = search.toLowerCase().trim();

      data = data.filter((product) =>
        product.name.toLowerCase().includes(searchText),
      );
    }

    // Price
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

    // Stock
    if (inStockOnly) {
      data = data.filter((product) => Number(product.stock) > 0);
    }

    // Sort
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

  // ============================
  // Loading
  // ============================

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

  // ============================
  // Category Not Found
  // ============================

  if (!category) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Category Not Found</h1>

          <p className="mt-3 text-gray-500">Category ID: {id}</p>

          <Link
            to="/categories"
            className="mt-6 inline-block rounded-full bg-rose-600 px-6 py-3 font-semibold text-white hover:bg-rose-700"
          >
            Back to Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* ============================
          Hero
      ============================ */}

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

            <span className="font-medium text-gray-900">{category.name}</span>
          </div>

          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            {category.name}
          </h1>

          <p className="mt-4 max-w-2xl text-gray-500">
            {category.description ||
              "Discover premium skincare products in this category."}
          </p>
        </div>
      </section>

      {/* ============================
          Products
      ============================ */}

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-4">
          {/* Sidebar */}

          <FilterSidebar
            products={products}
            priceFilter={priceFilter}
            setPriceFilter={setPriceFilter}
            inStockOnly={inStockOnly}
            setInStockOnly={setInStockOnly}
            clearFilters={clearFilters}
          />

          {/* Product Area */}

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
                      className="w-full rounded-xl border py-2 pl-10 pr-4 focus:border-rose-500 focus:outline-none sm:w-64"
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
                      type="button"
                      onClick={() => setView("grid")}
                      className={`p-2 ${
                        view === "grid" ? "bg-rose-600 text-white" : "bg-white"
                      }`}
                    >
                      <Grid3X3 size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() => setView("list")}
                      className={`p-2 ${
                        view === "list" ? "bg-rose-600 text-white" : "bg-white"
                      }`}
                    >
                      <List size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ============================
                Product List
            ============================ */}

            {filteredProducts.length === 0 ? (
              <div className="rounded-2xl bg-white py-20 text-center shadow-sm">
                <h3 className="text-2xl font-bold">No Products Found</h3>

                <p className="mt-3 text-gray-500">
                  There are no products in this category.
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
