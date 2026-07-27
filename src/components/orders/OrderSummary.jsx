import { ShoppingBag } from "lucide-react";
import { generateInvoice } from "../../utils/generateInvoice";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function OrderSummary({ order }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const handleBuyAgain = () => {
    const confirmed = window.confirm(
      "Add all items from this order to your cart?",
    );

    if (!confirmed) return;

    order.items.forEach((item) => {
      addToCart(item, item.quantity);
    });

    toast.success("Items added to your cart!");
    navigate("/cart");
  };

  const shipping = 0;
  const tax = 2;

  const total = order.total + shipping + tax;

  return (
    <div className="sticky top-24 rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <ShoppingBag className="text-rose-500" />

        <h2 className="text-xl font-bold">Order Summary</h2>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${order.total}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>Free</span>
        </div>

        <div className="flex justify-between">
          <span>Tax</span>
          <span>${tax}</span>
        </div>

        <hr />

        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>${total}</span>
        </div>
      </div>

      <button
        onClick={handleBuyAgain}
        className="mt-8 w-full rounded-xl bg-rose-600 py-3 font-semibold text-white transition hover:bg-rose-700"
      >
        Buy Again
      </button>

      <button
        onClick={() => generateInvoice(order)}
        className="mt-3 w-full rounded-xl border border-gray-200 py-3 font-semibold transition hover:bg-gray-100"
      >
        Download Invoice
      </button>
    </div>
  );
}
