import { Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function CartItem({ item }) {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  return (
    <div className="flex gap-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Product Image */}
      <img
        src={`http://localhost:8080${item.imageUrl}`}
        alt={item.name}
        className="h-28 w-28 rounded-xl object-contain border bg-white p-2"
      />

      {/* Product Info */}
      <div className="flex flex-1 flex-col">
        <h3 className="text-lg font-bold text-gray-900">
          {item.name}
        </h3>

        <p className="mt-1 text-sm text-rose-500">
          {item.brandName}
        </p>

        <p className="mt-2 text-gray-500">
          ${Number(item.price).toFixed(2)}
        </p>

        {/* Quantity */}
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={() => decreaseQuantity(item.id)}
            disabled={item.quantity <= 1}
            className="rounded-lg border p-2 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Minus size={16} />
          </button>

          <span className="w-8 text-center font-semibold">
            {item.quantity}
          </span>

          <button
            onClick={() => increaseQuantity(item.id)}
            disabled={item.quantity >= (item.stock ?? Infinity)}
            className="rounded-lg border p-2 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Stock */}
        <p className="mt-2 text-xs text-gray-400">
          Stock: {item.stock ?? "-"}
        </p>
      </div>

      {/* Right Side */}
      <div className="flex flex-col items-end justify-between">
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-red-500 transition hover:text-red-700"
        >
          <Trash2 size={20} />
        </button>

        <p className="text-xl font-bold text-gray-900">
          ${(Number(item.price) * item.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
}