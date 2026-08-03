import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function CategoryCard({ category }) {
  return (
    <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.25 }}>
      <Link
        to={`/category/${category.id}`}
        className="group flex h-full flex-col rounded-3xl bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-2xl"
      >
        {/* Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-rose-100 to-pink-200 transition group-hover:scale-110">
          <Sparkles className="h-9 w-9 text-rose-600" />
        </div>

        {/* Category Name */}
        <h3 className="mt-8 text-center text-2xl font-bold text-gray-900 transition group-hover:text-rose-600">
          {category.name}
        </h3>

        {/* Description */}
        <p className="mt-4 flex-1 text-center text-gray-500">
          {category.description ||
            "Discover premium skincare products specially selected for this category."}
        </p>

        {/* Footer */}
        <div className="mt-8 flex items-center justify-center gap-2 font-semibold text-rose-600">
          Explore
          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </div>
      </Link>
    </motion.div>
  );
}
