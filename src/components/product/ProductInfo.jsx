import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import QuantitySelector from "./QuantitySelector";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";
export default function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  return (
    <div>
      <p className="text-sm text-gray-500">{product.brand}</p>

      <h1 className="mt-2 text-4xl font-bold">{product.name}</h1>

      <div className="mt-4 flex items-center gap-3">
        <span className="text-yellow-500">{"★".repeat(product.rating)}</span>

        <span className="text-gray-500">({product.reviewCount} Reviews)</span>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <span className="text-3xl font-bold text-rose-600">
          ${product.price}
        </span>

        <span className="text-xl text-gray-400 line-through">
          ${product.oldPrice}
        </span>

        <span className="rounded-full bg-rose-100 px-3 py-1 text-sm text-rose-600">
          {product.discount}% OFF
        </span>
      </div>

      <p className="mt-6 leading-7 text-gray-600">{product.description}</p>

      <div className="mt-8 space-y-2">
        <p>
          <strong>Category:</strong> {product.category}
        </p>

        <p>
          <strong>Skin Type:</strong> {product.skinType}
        </p>

        <p>
          <strong>Weight:</strong> {product.weight}
        </p>

        <p>
          <strong>Stock:</strong> {product.stock}
        </p>
      </div>

      <div className="mt-8">
        <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
      </div>

      <div className="mt-8 flex gap-4">
        <button
          onClick={() => {
            addToCart(product, quantity);

            toast.success(`${quantity} × ${product.name} added to cart!`);
          }}
          className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-rose-600 font-semibold text-white transition hover:bg-rose-700"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>

        <button className="rounded-xl border p-4 hover:border-rose-500">
          <Heart size={22} />
        </button>
      </div>
    </div>
  );
}
