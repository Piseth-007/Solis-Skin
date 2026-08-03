import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function BrandCard({ brand }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.25 }}
      className="w-full sm:w-70 lg:w-55"
    >
      <Link
        to={`/brand/${brand.slug}`}
        className="group flex h-full flex-col rounded-3xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      >
        {/* Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-rose-100 via-pink-100 to-rose-200 transition group-hover:scale-110">
          <Sparkles className="h-9 w-9 text-rose-600" />
        </div>

        {/* Brand Name */}
        <h3 className="mt-8 text-center text-2xl font-bold text-gray-900 transition group-hover:text-rose-600">
          {brand.name}
        </h3>

        {/* Description */}
        <p className="mt-3 line-clamp-3 text-center text-sm leading-6 text-gray-500">
          Discover premium skincare products from {brand.name} and elevate your
          daily beauty routine.
        </p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-center gap-2 pt-8 text-rose-600">
          <span className="text-sm font-semibold">Explore Brand</span>

          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </div>
      </Link>
    </motion.div>
  );
}