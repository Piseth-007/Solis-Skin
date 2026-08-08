import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";

import QuantitySelector from "./QuantitySelector";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishListContext";

export default function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  const { toggleWishlist, isInWishlist } = useWishlist();

  const wished = isInWishlist(product.id);

  const stock = Number(product?.stock || 0);
  const price = Number(product?.price || 0);

  const handleAddToCart = () => {
    if (stock <= 0) {
      toast.error("This product is out of stock.");
      return;
    }

    if (quantity > stock) {
      toast.error(`Only ${stock} items available.`);
      return;
    }

    addToCart(product, quantity);

    toast.success(`${quantity} × ${product.name} added to cart!`);
  };

  const handleWishlist = () => {
    toggleWishlist(product);

    if (wished) {
      toast.success("Removed from wishlist");
    } else {
      toast.success("Added to wishlist ❤️");
    }
  };

  return (
    <div>
      {/* Brand */}
      <p className="text-sm font-medium uppercase tracking-wider text-rose-600">
        {product?.brandName || product?.brand || ""}
      </p>

      {/* Name */}
      <h1 className="mt-2 text-4xl font-bold text-gray-900">
        {product?.name || ""}
      </h1>

      {/* Rating */}
      {product?.rating != null && (
        <div className="mt-4 flex items-center gap-2">
          <div className="text-yellow-400">
            {"★".repeat(Math.min(5, Number(product.rating)))}
          </div>

          <span className="text-sm text-gray-500">
            ({product?.reviewCount || 0} Reviews)
          </span>
        </div>
      )}

      {/* Price */}
      <div className="mt-6 flex items-center gap-3">
        <span className="text-4xl font-bold text-rose-600">
          ${price.toFixed(2)}
        </span>

        {product?.oldPrice && Number(product.oldPrice) > price && (
          <span className="text-lg text-gray-400 line-through">
            ${Number(product.oldPrice).toFixed(2)}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="mt-6 leading-7 text-gray-600">
        {product?.description || "No description available."}
      </p>

      {/* Information */}
      <div className="mt-8 space-y-3 rounded-2xl border bg-white p-5">
        <p>
          <strong>Category:</strong>{" "}
          {product?.categoryName || product?.category || ""}
        </p>

        <p>
          <strong>Brand:</strong> {product?.brandName || product?.brand || ""}
        </p>

        <p>
          <strong>Stock:</strong>{" "}
          {stock > 0 ? (
            <span className="font-medium text-green-600">
              {stock} Available
            </span>
          ) : (
            <span className="font-medium text-red-600">Out of Stock</span>
          )}
        </p>
      </div>

      {/* Quantity */}
      {stock > 0 && (
        <div className="mt-8">
          <p className="mb-3 font-semibold">Quantity</p>

          <QuantitySelector
            quantity={quantity}
            setQuantity={setQuantity}
            stock={stock}
          />
        </div>
      )}

      {/* Buttons */}
      <div className="mt-8 flex gap-4">
        {/* Add To Cart */}
        <button
          type="button"
          disabled={stock <= 0}
          onClick={handleAddToCart}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-rose-600 font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          <ShoppingCart size={18} />

          {stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>

        {/* Wishlist */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className={`flex h-12 w-14 shrink-0 items-center justify-center rounded-xl border transition ${
            wished
              ? "border-rose-500 bg-rose-50 text-rose-500"
              : "border-gray-200 text-gray-500 hover:border-rose-500 hover:text-rose-500"
          }`}
        >
          <Heart
            size={22}
            className={wished ? "fill-rose-500 text-rose-500" : ""}
          />
        </button>
      </div>
    </div>
  );
}
