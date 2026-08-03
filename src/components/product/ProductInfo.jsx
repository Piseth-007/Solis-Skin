import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";

import QuantitySelector from "./QuantitySelector";
import { useCart } from "../../context/CartContext";

export default function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  return (
    <div>
      {/* Brand */}
      <p className="text-sm font-medium text-rose-600">{product.brandName}</p>

      {/* Name */}
      <h1 className="mt-2 text-4xl font-bold">{product.name}</h1>

      {/* Price */}
      <div className="mt-6">
        <span className="text-4xl font-bold text-rose-600">
          ${Number(product.price).toFixed(2)}
        </span>
      </div>

      {/* Description */}
      <p className="mt-6 leading-7 text-gray-600">
        {product.description || "No description available."}
      </p>

      {/* Information */}
      <div className="mt-8 space-y-3 rounded-2xl border bg-white p-5">
        <p>
          <strong>Category:</strong> {product.categoryName}
        </p>

        <p>
          <strong>Brand:</strong> {product.brandName}
        </p>

        <p>
          <strong>Stock:</strong>{" "}
          {product.stock > 0 ? (
            <span className="font-medium text-green-600">
              {product.stock} Available
            </span>
          ) : (
            <span className="font-medium text-red-600">Out of Stock</span>
          )}
        </p>
      </div>

      {/* Quantity */}
      {product.stock > 0 && (
        <div className="mt-8">
          <QuantitySelector
            quantity={quantity}
            setQuantity={setQuantity}
            stock={product.stock}
          />
        </div>
      )}

      {/* Buttons */}
      <div className="mt-8 flex gap-4">
        <button
          disabled={product.stock <= 0}
          onClick={() => {
            addToCart(product, quantity);

            toast.success(`${quantity} × ${product.name} added to cart!`);
          }}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-rose-600 font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          <ShoppingCart size={18} />
          {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>

        <button className="rounded-xl border p-4 transition hover:border-rose-500">
          <Heart size={22} />
        </button>
      </div>
    </div>
  );
}
