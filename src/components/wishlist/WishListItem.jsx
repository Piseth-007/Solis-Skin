import { Heart, ShoppingBag, Star, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishListContext";

export default function WishlistItem({ product }) {
  const { addToCart } = useCart();

  const { removeFromWishlist } = useWishlist();

  const handleMoveToCart = () => {
    addToCart(product);
    removeFromWishlist(product.id);

    toast.success(`${product.name} moved to cart`);
  };

  const handleRemove = () => {
    removeFromWishlist(product.id);

    toast.success("Removed from wishlist");
  };

  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-lg md:flex-row md:items-center">
      {/* Product Image */}
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="h-36 w-36 rounded-2xl object-cover"
        />
      </Link>

      {/* Product Info */}
      <div className="flex-1">
        <Link to={`/product/${product.id}`}>
          <h2 className="text-xl font-bold text-gray-900 hover:text-rose-600">
            {product.name}
          </h2>
        </Link>

        <p className="mt-1 text-sm text-gray-500">{product.brand}</p>

        <p className="mt-1 text-sm text-gray-400">{product.category}</p>

        <div className="mt-3 flex items-center gap-1">
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

          <span className="ml-2 text-sm text-gray-500">
            ({product.reviewCount})
          </span>
        </div>

        <p className="mt-4 text-2xl font-bold text-rose-600">
          ${product.price}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 md:w-56">
        <button
          onClick={handleMoveToCart}
          className="flex items-center justify-center gap-2 rounded-xl bg-rose-600 py-3 font-semibold text-white transition hover:bg-rose-700"
        >
          <ShoppingBag size={18} />
          Move to Cart
        </button>

        <button
          onClick={handleRemove}
          className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 py-3 font-semibold text-gray-700 transition hover:border-red-500 hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 size={18} />
          Remove
        </button>
      </div>
    </div>
  );
}
