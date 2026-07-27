import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import categories from "../../data/categories";

export default function Categories() {
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

        {/* Category Grid */}

        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{
                y: -10,
              }}
              transition={{
                duration: 0.25,
              }}
            >
              <Link
                to={`/category/${item.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition hover:shadow-2xl"
              >
                {/* Image */}

                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-64 w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  {/* Overlay */}

                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-70"></div>

                  {/* Badge */}

                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-rose-600 backdrop-blur">
                    Skincare
                  </span>
                </div>

                {/* Content */}

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {item.name}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                    {item.description}
                  </p>

                  <div className="mt-auto pt-6 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-400">
                      Explore
                    </span>

                    <ArrowRight
                      size={18}
                      className="text-rose-600 transition group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
