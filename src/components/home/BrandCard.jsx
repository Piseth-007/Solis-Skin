import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function BrandCard({ brand }) {
  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.04,
      }}
      transition={{
        duration: 0.25,
      }}
    >
      <Link
        to={`/brand/${brand.slug}`}
        className="group flex h-52 flex-col items-center justify-center rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-2xl"
      >
        <div className="flex h-20 items-center justify-center">
          <img
            src={brand.logo}
            alt={brand.name}
            className="max-h-14 object-contain grayscale transition duration-500 group-hover:scale-110 group-hover:grayscale-0"
          />
        </div>

        <h3 className="mt-6 text-center text-lg font-bold text-gray-900">
          {brand.name}
        </h3>

        <span className="mt-3 flex items-center gap-2 text-sm font-medium text-rose-600 opacity-0 transition duration-300 group-hover:opacity-100">
          Explore
          <ArrowRight size={16} />
        </span>
      </Link>
    </motion.div>
  );
}
