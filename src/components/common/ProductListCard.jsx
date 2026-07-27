import { Heart, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishListContext";

export default function ProductListCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const wished = isInWishlist(product.id);

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:shadow-lg"
    >
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <Link to={`/product/${product.id}`} className="relative md:w-72">
          <img
            src={product.image}
            alt={product.name}
            className="h-72 w-full object-cover"
          />

          {product.discount > 0 && (
            <span className="absolute left-4 top-4 rounded-full bg-rose-500 px-3 py-1 text-xs text-white">
              -{product.discount}%
            </span>
          )}
        </Link>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold uppercase text-rose-500">
                {product.brand}
              </p>

              <Link to={`/product/${product.id}`}>
                <h2 className="mt-2 text-2xl font-bold hover:text-rose-600">
                  {product.name}
                </h2>
              </Link>

              <p className="mt-2 text-gray-500">{product.description}</p>
            </div>

            <button
              onClick={() => toggleWishlist(product)}
              className="rounded-full border p-3"
            >
              <Heart className={wished ? "fill-rose-500 text-rose-500" : ""} />
            </button>
          </div>

          <div className="mt-4 flex items-center gap-2">
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

            <span className="text-sm text-gray-500">
              ({product.reviewCount})
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-rose-100 px-3 py-1 text-xs">
              {product.category}
            </span>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs">
              {product.skinType}
            </span>
          </div>

          <div className="mt-auto flex items-center justify-between pt-8">
            <div>
              <span className="text-3xl font-bold">${product.price}</span>

              {product.oldPrice && (
                <span className="ml-3 text-gray-400 line-through">
                  ${product.oldPrice}
                </span>
              )}
            </div>

            <button
              onClick={() => {
                addToCart(product);
                toast.success("Added to cart");
              }}
              className="flex items-center gap-2 rounded-full bg-rose-600 px-6 py-3 text-white hover:bg-rose-700"
            >
              <ShoppingBag size={18} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
