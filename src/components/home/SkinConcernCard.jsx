import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function SkinConcernCard({ concern }) {
  return (
    <motion.div
      whileHover={{
        y: -10,
      }}
      transition={{
        duration: 0.25,
      }}
    >
      <Link
        to={`/shop?concern=${concern.slug}`}
        className="group relative block overflow-hidden rounded-3xl shadow-lg"
      >
        {/* Image */}

        <img
          src={concern.image}
          alt={concern.title}
          className="h-107.5 w-full object-cover transition duration-700 group-hover:scale-110"
        />

        {/* Overlay */}

        <div
          className={`absolute inset-0 bg-linear-to-t ${concern.color} opacity-75`}
        ></div>

        {/* Content */}

        <div className="absolute inset-x-0 bottom-0 p-8 text-white">
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur">
            Skin Concern
          </span>

          <h3 className="mt-5 text-3xl font-bold">{concern.title}</h3>

          <p className="mt-4 leading-7 text-white/90">{concern.description}</p>

          <div className="mt-8 flex items-center gap-2 font-semibold">
            Explore Products
            <ArrowRight
              size={18}
              className="transition group-hover:translate-x-2"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
