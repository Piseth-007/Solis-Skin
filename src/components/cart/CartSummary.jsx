import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function CartSummary() {
  const { totalPrice } = useCart();

  const shipping = totalPrice >= 50 ? 0 : 5;
  const tax = totalPrice * 0.1;
  const total = totalPrice + shipping + tax;

  return (
    <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">Order Summary</h2>

      {/* Subtotal */}
      <div className="mb-3 flex justify-between">
        <span className="text-gray-600">Subtotal</span>
        <span className="font-semibold">${totalPrice.toFixed(2)}</span>
      </div>

      {/* Shipping */}
      <div className="mb-3 flex justify-between">
        <span className="text-gray-600">Shipping</span>

        {shipping === 0 ? (
          <span className="font-semibold text-green-600">FREE</span>
        ) : (
          <span className="font-semibold">${shipping.toFixed(2)}</span>
        )}
      </div>

      {/* Tax */}
      <div className="mb-5 flex justify-between">
        <span className="text-gray-600">Tax (10%)</span>
        <span className="font-semibold">${tax.toFixed(2)}</span>
      </div>

      <hr className="my-5" />

      {/* Total */}
      <div className="mb-8 flex justify-between text-xl font-bold">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      {/* Checkout */}
      <Link
        to="/checkout"
        className="block w-full rounded-full bg-rose-600 py-3 text-center font-semibold text-white transition hover:bg-rose-700"
      >
        Proceed to Checkout
      </Link>

      {/* Continue Shopping */}
      <Link
        to="/shop"
        className="mt-4 block w-full rounded-full border border-gray-300 py-3 text-center font-semibold transition hover:bg-gray-100"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
