import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import brands from "../../data/brands";
import BrandCard from "./BrandCard";

export default function BrandSection() {
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
            Every product is carefully selected to help you build
            a healthy and confident skincare routine.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="rounded-full bg-white px-5 py-3 shadow">
              <span className="font-bold text-rose-600">
                {brands.length}
              </span>{" "}
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

        {/* Brand Grid */}

        <div className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {brands.map((brand) => (
            <BrandCard
              key={brand.id}
              brand={brand}
            />
          ))}
        </div>
      </div>
    </section>
  );
}