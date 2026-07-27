import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Grid3X3, List, Search } from "lucide-react";

import brands from "../data/brands";
import products from "../data/products";

import ProductCard from "../components/common/ProductCard";
import ProductListCard from "../components/common/ProductListCard";
import FilterSidebar from "../components/category/FilterSidebar";

export default function BrandProducts() {
  const { slug } = useParams();

  const brand = brands.find((b) => b.slug.toLowerCase() === slug.toLowerCase());

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [view, setView] = useState("grid");

  const [priceFilter, setPriceFilter] = useState("all");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSkinTypes, setSelectedSkinTypes] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);

  const clearFilters = () => {
    setSearch("");
    setSortBy("default");
    setPriceFilter("all");
    setSelectedBrands([]);
    setSelectedSkinTypes([]);
    setSelectedRating(0);
    setInStockOnly(false);
  };

  const filteredProducts = useMemo(() => {
    let data = products.filter(
      (product) => product.brand.toLowerCase() === brand?.name.toLowerCase(),
    );

    if (search) {
      data = data.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

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

    if (selectedSkinTypes.length) {
      data = data.filter((p) => selectedSkinTypes.includes(p.skinType));
    }

    if (selectedRating > 0) {
      data = data.filter((p) => p.rating >= selectedRating);
    }

    if (inStockOnly) {
      data = data.filter((p) => p.stock > 0);
    }

    switch (sortBy) {
      case "price-low":
        data.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        data.sort((a, b) => b.price - a.price);
        break;

      case "rating":
        data.sort((a, b) => b.rating - a.rating);
        break;

      case "name":
        data.sort((a, b) => a.name.localeCompare(b.name));
        break;

      default:
        break;
    }

    return data;
  }, [
    brand,
    search,
    sortBy,
    priceFilter,
    selectedSkinTypes,
    selectedRating,
    inStockOnly,
  ]);

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

      <section className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="flex items-center gap-6">
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-20 w-20 object-contain"
            />

            <div>
              <div className="text-sm text-gray-500">
                <Link to="/">Home</Link>

                <span className="mx-2">/</span>

                <Link to="/brands">Brands</Link>

                <span className="mx-2">/</span>

                {brand.name}
              </div>

              <h1 className="mt-2 text-5xl font-bold">{brand.name}</h1>

              <p className="mt-3 max-w-2xl text-gray-500">
                {brand.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-4">
          <FilterSidebar
            products={filteredProducts}
            priceFilter={priceFilter}
            setPriceFilter={setPriceFilter}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            selectedSkinTypes={selectedSkinTypes}
            setSelectedSkinTypes={setSelectedSkinTypes}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
            inStockOnly={inStockOnly}
            setInStockOnly={setInStockOnly}
            clearFilters={clearFilters}
          />

          <div className="lg:col-span-3">
            {/* Reuse your toolbar from CategoryProducts */}

            {/* Grid/List */}

            {view === "grid" ? (
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
};
