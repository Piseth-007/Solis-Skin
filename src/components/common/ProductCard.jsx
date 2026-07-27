import { Heart, Eye, ShoppingBag, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishListContext";

export default function ProductCard({ product, view = "grid" }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const wished = isInWishlist(product.id);

  // ==========================
  // LIST VIEW
  // ==========================

  if (view === "list") {
    return (
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm hover:shadow-xl"
      >
        <div className="flex flex-col lg:flex-row">
          {/* Image */}
          <Link to={`/product/${product.id}`} className="relative lg:w-80">
            <img
              src={product.image}
              alt={product.name}
              className="h-80 w-full object-cover"
            />

            {product.discount > 0 && (
              <span className="absolute left-4 top-4 rounded-full bg-rose-500 px-3 py-1 text-xs font-semibold text-white">
                -{product.discount}%
              </span>
            )}

            {product.isNew && (
              <span className="absolute left-4 top-14 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
                NEW
              </span>
            )}
          </Link>

          {/* Content */}
          <div className="flex flex-1 flex-col p-8">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-rose-500">
                  {product.brand}
                </p>

                <Link to={`/product/${product.id}`}>
                  <h2 className="mt-2 text-2xl font-bold hover:text-rose-600">
                    {product.name}
                  </h2>
                </Link>

                <p className="mt-4 text-gray-500">{product.description}</p>

                <div className="mt-4 flex gap-3">
                  <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-600">
                    {product.category}
                  </span>

                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600">
                    {product.skinType} Skin
                  </span>
                </div>

                <div className="mt-5 flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < product.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}

                  <span className="ml-2 text-gray-500">
                    ({product.reviewCount})
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  toggleWishlist(product);

                  wished
                    ? toast.success("Removed from wishlist")
                    : toast.success("Added to wishlist");
                }}
                className="rounded-full border p-3 transition hover:bg-gray-50"
              >
                <Heart
                  size={20}
                  className={
                    wished ? "fill-rose-500 text-rose-500" : "text-gray-500"
                  }
                />
              </button>
            </div>

            <div className="mt-auto flex items-center justify-between pt-8">
              <div>
                <span className="text-3xl font-bold">${product.price}</span>

                {product.oldPrice && (
                  <span className="ml-3 text-lg text-gray-400 line-through">
                    ${product.oldPrice}
                  </span>
                )}
              </div>

              <button
                onClick={() => {
                  addToCart(product);
                  toast.success("Added to Cart");
                }}
                className="flex items-center gap-2 rounded-full bg-rose-600 px-7 py-3 font-semibold text-white transition hover:bg-rose-700"
              >
                <ShoppingBag size={18} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  // ==========================
  // GRID VIEW
  // ==========================

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group flex h-155 flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-rose-200 hover:shadow-xl"
    >
      <Link to={`/product/${product.id}`} className="flex flex-1 flex-col">
        {/* Image */}
        <div className="relative h-72 overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          />

          {product.discount > 0 && (
            <span className="absolute left-4 top-4 rounded-full bg-rose-500 px-3 py-1 text-xs font-semibold text-white shadow">
              -{product.discount}%
            </span>
          )}

          {product.isNew && (
            <span className="absolute left-4 top-14 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white shadow">
              NEW
            </span>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              toggleWishlist(product);

              wished
                ? toast.success("Removed from wishlist")
                : toast.success("Added to wishlist");
            }}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow transition hover:scale-110"
          >
            <Heart
              size={18}
              className={
                wished ? "fill-rose-500 text-rose-500" : "text-gray-500"
              }
            />
          </button>

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
          <p className="text-sm font-semibold uppercase tracking-wider text-rose-500">
            {product.brand}
          </p>

          <h3 className="mt-2 min-h-14 line-clamp-2 text-lg font-bold text-gray-900">
            {product.name}
          </h3>

          <p className="mt-1 text-sm text-gray-400">{product.category}</p>

          <p className="mt-1 text-sm text-gray-500">{product.skinType} Skin</p>

          <div className="mt-4 flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={
                  i < product.rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}

            <span className="ml-2 text-sm text-gray-500">
              ({product.reviewCount})
            </span>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <span className="text-2xl font-bold">${product.price}</span>

            {product.oldPrice && (
              <span className="text-lg text-gray-400 line-through">
                ${product.oldPrice}
              </span>
            )}
          </div>

          <div className="flex-1" />
        </div>
      </Link>

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
