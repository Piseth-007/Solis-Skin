import { Link } from "react-router-dom";
import { Calendar, Package, ChevronRight } from "lucide-react";

import OrderStatusBadge from "./OrderStatusBadge";

export default function OrderCard({ order }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm transition hover:shadow-lg">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div>
          <div className="flex items-center gap-3">
            <Package className="text-rose-500" />

            <h2 className="text-xl font-bold">Order #{order.id}</h2>

            <OrderStatusBadge status={order.status} />
          </div>

          <div className="mt-4 flex flex-wrap gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {order.date}
            </div>

            <span>
              {order.items.length} Item
              {order.items.length > 1 ? "s" : ""}
            </span>

            <span className="font-semibold text-gray-900">${order.total}</span>
          </div>
        </div>

        {/* Right */}
        <Link
          to={`/orders/${order.id}`}
          className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-3 font-semibold text-white transition hover:bg-rose-700"
        >
          View Details
          <ChevronRight size={18} />
        </Link>
      </div>
    </div>
  );
}
