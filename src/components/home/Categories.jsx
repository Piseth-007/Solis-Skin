import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { getCategories } from "../../api/categoryApi";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to load categories:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-white via-rose-50/40 to-white py-24">
      {/* Background */}
      <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-rose-200/20 blur-3xl"></div>
      <div className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-pink-200/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="text-center">
          <span className="inline-flex rounded-full bg-rose-100 px-5 py-2 text-sm font-semibold text-rose-600">
            Shop by Category
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Find Your Perfect Routine
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-500">
            Browse our curated skincare categories and discover products
            designed for every step of your daily skincare routine.
          </p>

          <div className="mt-8">
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-6 py-3 font-semibold text-white transition hover:bg-rose-700"
            >
              View All Categories
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="mt-20 text-center text-gray-500">
            Loading categories...
          </div>
        ) : (
          <div className="mt-20 flex flex-wrap justify-center gap-8">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.25 }}
                className="w-full sm:w-70 lg:w-55"
              >
                <Link
                  to={`/category/${category.slug}`}
                  className="group flex h-full flex-col rounded-3xl bg-white p-8 shadow-sm transition hover:shadow-2xl"
                >
                  {/* Icon */}
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-rose-100 to-pink-200">
                    <Sparkles className="h-9 w-9 text-rose-600" />
                  </div>

                  {/* Content */}
                  <h3 className="mt-8 text-center text-xl font-bold text-gray-900">
                    {category.name}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-center text-sm leading-6 text-gray-500">
                    {category.description}
                  </p>

                  <div className="mt-auto flex items-center justify-center gap-2 pt-8 text-rose-600">
                    <span className="text-sm font-medium">Explore</span>

                    <ArrowRight
                      size={18}
                      className="transition group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
