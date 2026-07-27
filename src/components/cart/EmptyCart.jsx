import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmptyCart() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <div className="flex h-28 w-28 items-center justify-center rounded-full bg-rose-100">
        <ShoppingBag className="h-12 w-12 text-rose-600" />
      </div>

      <h2 className="mt-6 text-3xl font-bold text-gray-900">
        Your cart is empty
      </h2>

      <p className="mt-3 text-gray-500">
        Looks like you haven't added any skincare products yet.
      </p>

      <Link
        to="/shop"
        className="mt-8 rounded-full bg-rose-600 px-8 py-3 font-semibold text-white transition hover:bg-rose-700"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
