import { useEffect, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

import { getBrands } from "../../api/brandApi";
import BrandCard from "./BrandCard";

export default function BrandSection() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      const data = await getBrands();
      setBrands(data);
    } catch (err) {
      console.error("Failed to load brands:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-white via-rose-50/40 to-white py-24">
      {/* Background */}
      <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-rose-200/20 blur-3xl"></div>
      <div className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-pink-200/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="text-center">
          <span className="inline-flex rounded-full bg-rose-100 px-5 py-2 text-sm font-semibold text-rose-600">
            Trusted Worldwide
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Shop Your Favorite Brands
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-500">
            Discover premium skincare from globally trusted brands.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <div className="rounded-full bg-white px-5 py-3 shadow">
              <span className="font-bold text-rose-600">{brands.length}</span>{" "}
              Premium Brands
            </div>

            <Link
              to="/brands"
              className="flex items-center gap-2 rounded-full bg-rose-600 px-6 py-3 font-semibold text-white transition hover:bg-rose-700"
            >
              View All
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="mt-20">
          {loading ? (
            <div className="flex flex-col items-center justify-center gap-4 py-12">
              <Loader2 className="h-10 w-10 animate-spin text-rose-500" />
              <p className="text-gray-500">Loading brands...</p>
            </div>
          ) : brands.length === 0 ? (
            <div className="text-center text-gray-500">
              No brands available.
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-8">
              {brands.map((brand) => (
                <BrandCard key={brand.id} brand={brand} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
