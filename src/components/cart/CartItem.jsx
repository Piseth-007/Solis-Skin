import { Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function CartItem({ item }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <div className="flex gap-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Product Image */}
      <img
        src={item.image}
        alt={item.name}
        className="h-28 w-28 rounded-xl object-cover"
      />

      {/* Product Info */}
      <div className="flex flex-1 flex-col">
        <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>

        <p className="mt-1 text-sm text-rose-500">{item.brand}</p>

        <p className="mt-2 text-gray-500">${item.price.toFixed(2)}</p>

        {/* Quantity */}
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={() => decreaseQuantity(item.id)}
            className="rounded-lg border p-2 hover:bg-gray-100"
          >
            <Minus size={16} />
          </button>

          <span className="w-8 text-center font-semibold">{item.quantity}</span>

          <button
            onClick={() => increaseQuantity(item.id)}
            className="rounded-lg border p-2 hover:bg-gray-100"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col items-end justify-between">
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 size={20} />
        </button>

        <p className="text-xl font-bold text-gray-900">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
}
