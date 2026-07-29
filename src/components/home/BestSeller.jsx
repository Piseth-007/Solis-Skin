import { motion } from "framer-motion";
import { ArrowRight, Eye, Heart, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";

import products from "../../data/products";

export default function BestSeller() {
  const bestSellers = products
    .filter((product) => product.bestSeller)
    .slice(0, 8);

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-rose-50 via-white to-rose-50 py-24">
      {/* Background */}

      <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-rose-200/20 blur-3xl"></div>

      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-pink-200/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}

        <div className="text-center">
          <span className="inline-flex rounded-full bg-rose-100 px-5 py-2 text-sm font-semibold text-rose-600">
            Customer Favorites
          </span>

          <h2 className="mt-6 text-4xl font-bold md:text-5xl">Best Sellers</h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-500">
            Discover our most-loved skincare products selected by thousands of
            happy customers.
          </p>
        </div>

        {/* Products */}

        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.25 }}
              className="group overflow-hidden rounded-3xl bg-white shadow transition hover:shadow-2xl"
            >
              {/* Image */}

              <div className="relative overflow-hidden">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-72 w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                </Link>

                {/* Discount */}

                {product.discount > 0 && (
                  <span className="absolute left-4 top-4 rounded-full bg-rose-600 px-3 py-1 text-xs font-semibold text-white">
                    -{product.discount}%
                  </span>
                )}

                {/* Wishlist */}

                <button className="absolute right-4 top-4 rounded-full bg-white p-2 shadow transition hover:bg-rose-600 hover:text-white">
                  <Heart size={18} />
                </button>

                {/* Quick View */}

                <Link
                  to={`/product/${product.slug}`}
                  className="absolute bottom-4 left-1/2 flex -translate-x-1/2 translate-y-10 items-center gap-2 rounded-full bg-white px-5 py-2 font-medium opacity-0 shadow transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  <Eye size={16} />
                  Quick View
                </Link>
              </div>

              {/* Content */}

              <div className="p-6">
                <p className="text-sm text-rose-500">{product.brand}</p>

                <Link
                  to={`/product/${product.slug}`}
                  className="mt-2 block text-lg font-bold text-gray-900 transition hover:text-rose-600"
                >
                  {product.name}
                </Link>

                {/* Rating */}

                <div className="mt-4 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={
                        star <= Math.round(product.rating)
                          ? "fill-black text-black"
                          : "text-gray-300"
                      }
                    />
                  ))}

                  <span className="ml-2 text-sm text-gray-500">
                    ({product.reviewCount})
                  </span>
                </div>

                {/* Price */}

                <div className="mt-5 flex items-center gap-3">
                  <span className="text-2xl font-bold text-rose-600">
                    ${product.price}
                  </span>

                  {product.oldPrice && (
                    <span className="text-gray-400 line-through">
                      ${product.oldPrice}
                    </span>
                  )}
                </div>

                {/* Button */}

                <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 py-3 font-semibold text-white transition hover:bg-rose-700">
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All */}

        <div className="mt-16 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-full border border-rose-600 px-8 py-4 font-semibold text-rose-600 transition hover:bg-rose-600 hover:text-white"
          >
            View All Products
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
