import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/category/${category.slug}`}
      className="group overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold">{category.name}</h3>

        <p className="mt-3 text-gray-500">{category.description}</p>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {category.productCount} Products
          </span>

          <span className="flex items-center gap-2 font-semibold text-rose-600">
            Explore
            <ArrowRight size={18} />
          </span>
        </div>
      </div>
    </Link>
  );
}
