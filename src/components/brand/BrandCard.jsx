import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const IMAGE_BASE = "http://localhost:8080";

export default function BrandCard({ brand }) {
  return (
    <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.25 }}>
      <Link
        to={`/brands/${brand.id}`}
        className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition hover:shadow-2xl"
      >
        <div className="flex h-52 items-center justify-center overflow-hidden bg-linear-to-br from-rose-50 to-pink-100 p-8">
          <img
            src={`${IMAGE_BASE}${brand.logoUrl}`}
            alt={brand.name}
            className="max-h-32 object-contain transition duration-300 group-hover:scale-110"
          />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-2xl font-bold">{brand.name}</h3>

          <p className="mt-3 flex-1 text-gray-500">
            {brand.description || "Premium skincare brand."}
          </p>

          <div className="mt-6 flex justify-end">
            <span className="flex items-center gap-2 font-semibold text-rose-600">
              Explore
              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
