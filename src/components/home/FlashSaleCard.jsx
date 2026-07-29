import { motion } from "framer-motion";
import { Eye, Heart, ShoppingCart, Star, Flame } from "lucide-react";
import { Link } from "react-router-dom";

export default function FlashSaleCard({ product }) {
  const percent = Math.min((product.sold / product.stock) * 100, 100);

  const remaining = product.stock - product.sold;

  return (
    <motion.div
      whileHover={{
        y: -10,
        transition: { duration: 0.25 },
      }}
      className="group overflow-hidden rounded-3xl bg-white shadow-sm transition hover:shadow-2xl"
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

        {/* Left Badges */}

        <div className="absolute left-4 top-4 flex flex-col gap-2">
          <span className="flex items-center gap-1 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
            <Flame size={12} />-{product.discount}%
          </span>

          {product.isNew && (
            <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
              New
            </span>
          )}
        </div>

        {/* Wishlist */}

        <button className="absolute right-4 top-4 rounded-full bg-white p-2 shadow transition hover:scale-110 hover:bg-rose-600 hover:text-white">
          <Heart size={18} />
        </button>

        {/* Quick View */}

        <Link
          to={`/product/${product.slug}`}
          className="absolute bottom-4 left-1/2 flex -translate-x-1/2 translate-y-10 items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold shadow-lg opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <Eye size={16} />
          Quick View
        </Link>
      </div>

      {/* Content */}

      <div className="p-6">
        {/* Brand */}

        <p className="text-sm font-medium text-rose-500">{product.brand}</p>

        {/* Product */}

        <Link
          to={`/product/${product.id}`}
          className="mt-2 block text-lg font-bold text-gray-900 transition hover:text-rose-600"
        >
          {product.name}
        </Link>

        {/* Rating */}

        <div className="mt-3 flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={15}
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

          <span className="text-gray-400 line-through">
            ${product.oldPrice}
          </span>
        </div>

        {/* Save */}

        <p className="mt-1 text-sm font-medium text-green-600">
          Save ${(product.oldPrice - product.price).toFixed(2)}
        </p>

        {/* Progress */}

        <div className="mt-6">
          <div className="mb-2 flex justify-between text-sm text-gray-500">
            <span>Sold {product.sold}</span>

            <span>{remaining} Left</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-gray-200">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${percent}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="h-full rounded-full bg--to-r from-rose-500 to-red-500"
            />
          </div>
        </div>

        {/* Button */}

        <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 py-3 font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-rose-700 hover:shadow-lg">
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
