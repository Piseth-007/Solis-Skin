import { Heart, Eye, ShoppingBag, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishListContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const { toggleWishlist, isInWishlist } = useWishlist();

  const wished = isInWishlist(product.id);

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group flex h-155 flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-rose-200 hover:shadow-xl"
    >
      {/* Clickable Area */}
      <Link to={`/product/${product.id}`} className="flex flex-1 flex-col">
        {/* Image */}
        <div className="relative h-72 overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          />

          {/* Discount */}
          {product.discount > 0 && (
            <span className="absolute left-4 top-4 rounded-full bg-rose-500 px-3 py-1 text-xs font-semibold text-white shadow">
              -{product.discount}%
            </span>
          )}

          {/* New */}
          {product.isNew && (
            <span className="absolute left-4 top-14 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white shadow">
              NEW
            </span>
          )}

          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              toggleWishlist(product);

              if (wished) {
                toast.success("Removed from wishlist");
              } else {
                toast.success("Added to wishlist");
              }
            }}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow transition hover:scale-110"
          >
            <Heart
              size={18}
              className={`transition ${
                wished
                  ? "fill-rose-500 text-rose-500"
                  : "text-gray-500 hover:text-rose-500"
              }`}
            />
          </button>

          {/* Quick View */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toast("👀 Quick View coming soon!");
            }}
            className="absolute bottom-5 left-1/2 flex -translate-x-1/2 translate-y-8 items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-medium shadow-lg opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <Eye size={16} />
            Quick View
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          {/* Brand */}
          <p className="text-sm font-semibold uppercase tracking-wider text-rose-500">
            {product.brand}
          </p>

          {/* Name */}
          <h3 className="mt-2 min-h-14 line-clamp-2 text-lg font-bold text-gray-900">
            {product.name}
          </h3>

          {/* Category */}
          <p className="mt-1 text-sm text-gray-400">{product.category}</p>

          {/* Skin Type */}
          <p className="mt-1 text-sm text-gray-500">{product.skinType} Skin</p>

          {/* Rating */}
          <div className="mt-4 flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={16}
                  className={
                    index < product.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>

            <span className="ml-2 text-sm text-gray-500">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="mt-5 flex items-center gap-3">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price}
            </span>

            {product.oldPrice && (
              <span className="text-lg text-gray-400 line-through">
                ${product.oldPrice}
              </span>
            )}
          </div>

          <div className="flex-1" />
        </div>
      </Link>

      {/* Add To Cart */}
      <div className="px-6 pb-6">
        <button
          onClick={() => {
            addToCart(product);
            toast.success(`${product.name} added to cart!`);
          }}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-rose-600 font-semibold text-white transition hover:bg-rose-700 hover:shadow-lg"
        >
          <ShoppingBag size={18} />
          Add to Cart
        </button>
      </div>
    </motion.article>
  );
}
