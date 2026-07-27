import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function OrderSuccess() {
  // Temporary order number
  const orderNumber = Math.floor(100000 + Math.random() * 900000);

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-xl rounded-3xl bg-white p-10 text-center shadow-lg">
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-green-100 p-5">
            <CheckCircle size={70} className="text-green-600" />
          </div>
        </div>

        {/* Title */}
        <h1 className="mb-3 text-4xl font-bold text-gray-900">Thank You!</h1>

        <p className="mb-8 text-gray-600">
          Your order has been placed successfully. We appreciate your purchase
          and will begin processing your order shortly.
        </p>

        {/* Order Info */}
        <div className="mb-8 rounded-2xl bg-gray-100 p-6">
          <div className="flex justify-between">
            <span className="font-medium">Order Number</span>

            <span className="font-bold">#{orderNumber}</span>
          </div>

          <div className="mt-4 flex justify-between">
            <span className="font-medium">Estimated Delivery</span>

            <span className="font-semibold text-green-600">
              2–5 Business Days
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            to="/shop"
            className="flex-1 rounded-xl bg-rose-600 py-3 text-center font-semibold text-white transition hover:bg-rose-700"
          >
            Continue Shopping
          </Link>

          <Link
            to="/"
            className="flex-1 rounded-xl border border-gray-300 py-3 text-center font-semibold transition hover:bg-gray-100"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
