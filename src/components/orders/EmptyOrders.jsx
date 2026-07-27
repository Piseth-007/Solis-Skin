import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmptyOrders() {
  return (
    <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-rose-100">
        <ShoppingBag className="text-rose-600" size={36} />
      </div>

      <h2 className="mt-6 text-2xl font-bold">No Orders Yet</h2>

      <p className="mt-3 text-gray-500">
        You haven't placed any orders yet. Start shopping to see your orders
        here.
      </p>

      <Link
        to="/shop"
        className="mt-8 inline-flex rounded-xl bg-rose-600 px-6 py-3 font-semibold text-white transition hover:bg-rose-700"
      >
        Start Shopping
      </Link>
    </div>
  );
}
