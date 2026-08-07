import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import ProductCard from "../common/ProductCard";

export default function NewArrivals({ products = [] }) {
  const newest = useMemo(
    () =>
      [...products]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4),
    [products],
  );

  if (newest.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-white via-rose-50/40 to-white py-24">
      {/* Background */}
      <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-rose-200/20 blur-3xl"></div>

      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-pink-200/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-16 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <span className="inline-flex rounded-full bg-rose-100 px-5 py-2 text-sm font-semibold text-rose-600">
               Just Arrived
            </span>

            <h2 className="mt-6 text-4xl font-bold text-gray-900 md:text-5xl">
              New Arrivals
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-500">
              Discover our latest skincare innovations, carefully selected to
              elevate your daily beauty routine.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-7 py-4 font-semibold text-white transition hover:bg-rose-700"
          >
            View All
            <ArrowRight size={18} />
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {newest.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
