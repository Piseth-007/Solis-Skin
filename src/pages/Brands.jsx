import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import { getBrands } from "../api/brandApi";
import BrandCard from "../components/brand/BrandCard";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      const data = await getBrands();
      setBrands(data);
    } catch (error) {
      console.error("Failed to load brands:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-linear-to-r from-rose-500 to-pink-500 text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h1 className="text-5xl font-bold">Discover Our Brands</h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-rose-100">
            Shop premium skincare from trusted international brands, carefully
            selected for every skin type.
          </p>
        </div>
      </section>

      {/* Brand Grid */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-bold">Featured Brands</h2>

            <p className="mt-2 text-gray-500">
              {brands.length} skincare brands available.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-rose-600" />
          </div>
        ) : brands.length === 0 ? (
          <div className="rounded-3xl bg-white py-20 text-center shadow">
            <h3 className="text-2xl font-semibold text-gray-800">
              No Brands Found
            </h3>

            <p className="mt-2 text-gray-500">Please check back later.</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {brands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
