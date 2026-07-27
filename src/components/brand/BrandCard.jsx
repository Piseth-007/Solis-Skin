import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function BrandCard({ brand }) {
  return (
    <Link
      to={`/brand/${brand.slug}`}
      className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      <div className="flex h-48 items-center justify-center bg-linear-to-br from-rose-50 to-pink-100 p-8">
        <img
          src={brand.logo}
          alt={brand.name}
          className="max-h-24 object-contain transition duration-300 group-hover:scale-110"
        />
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900">{brand.name}</h3>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          {brand.description}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-600">
            {brand.country}
          </span>

          <span className="flex items-center gap-2 font-medium text-rose-600 transition group-hover:translate-x-1">
            Explore
            <ArrowRight size={18} />
          </span>
        </div>
      </div>
    </Link>
  );
}
