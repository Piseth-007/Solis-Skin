import { ShoppingBag } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function OrderSummary({ onPlaceOrder }) {
  const { cart, totalPrice } = useCart();

  const shipping = totalPrice >= 50 ? 0 : 5;
  const tax = totalPrice * 0.1;
  const total = totalPrice + shipping + tax;

  return (
    <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-sm h-fit">
      {/* Header */}
      <div className="flex items-center gap-2 border-b pb-4">
        <ShoppingBag className="text-rose-600" size={24} />

        <h2 className="text-2xl font-bold">Order Summary</h2>
      </div>

      {/* Products */}
      <div className="mt-6 space-y-4">
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border-b pb-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-16 w-16 rounded-lg object-cover"
              />

              <div className="flex-1">
                <h3 className="line-clamp-1 font-semibold">{item.name}</h3>

                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>

              <span className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Price Summary */}
      <div className="mt-6 space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-500">Subtotal</span>

          <span className="font-medium">${totalPrice.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Shipping</span>

          <span className="font-medium">
            {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Tax (10%)</span>

          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>

        <hr />

        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>

          <span className="text-rose-600">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Free Shipping Notice */}
      {shipping > 0 && (
        <div className="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-700">
          Add another <strong>${(50 - totalPrice).toFixed(2)}</strong> to get{" "}
          <strong>FREE Shipping</strong>.
        </div>
      )}

      {shipping === 0 && (
        <div className="mt-6 rounded-xl bg-green-50 p-4 text-sm text-green-700">
          🎉 Congratulations! You qualify for FREE shipping.
        </div>
      )}

      {/* Button */}
      <button
        disabled={cart.length === 0}
        onClick={onPlaceOrder}
        className="mt-8 w-full rounded-xl bg-rose-600 py-3 font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Place Order
      </button>

      {/* Secure Checkout */}
      <p className="mt-4 text-center text-xs text-gray-500">
        🔒 Secure checkout with encrypted payment processing.
      </p>
    </div>
  );
}
