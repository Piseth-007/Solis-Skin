import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import skinConcerns from "../../data/skinConcerns";
import SkinConcernCard from "./SkinConcernCard";

export default function SkinConcern() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-white via-rose-50/40 to-white py-24">
      {/* Background */}

      <div className="absolute -left-32 top-0 h-72 w-72 rounded-full bg-rose-200/20 blur-3xl"></div>

      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-pink-200/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}

        <div className="text-center">
          <span className="inline-flex rounded-full bg-rose-100 px-5 py-2 text-sm font-semibold text-rose-600">
            Personalized Skincare
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Shop by Skin Concern
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-500">
            Everyone's skin is unique. Explore products specially curated to
            target your skin concerns and build the perfect routine.
          </p>

          <div className="mt-8">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-6 py-3 font-semibold text-white transition hover:bg-rose-700"
            >
              Explore Products
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* Cards */}

        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {skinConcerns.map((item) => (
            <SkinConcernCard key={item.id} concern={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
