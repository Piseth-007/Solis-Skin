import { Link } from "react-router-dom";
import { Calendar, Package, ChevronRight, CreditCard } from "lucide-react";

import OrderStatusBadge from "./OrderStatusBadge";

export default function OrderCard({ order }) {
  const itemCount = order?.items?.length || 0;

  const totalAmount = Number(order?.totalAmount || 0);

  const createdDate = order?.createdAt
    ? new Date(order.createdAt).toLocaleDateString()
    : "-";

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm transition hover:shadow-lg">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div className="min-w-0">
          {/* Order Header */}
          <div className="flex flex-wrap items-center gap-3">
            <Package size={22} className="shrink-0 text-rose-500" />

            <h2 className="text-xl font-bold">
              Order #{order?.orderNumber || order?.id || "-"}
            </h2>

            <OrderStatusBadge status={order?.status || "PENDING"} />
          </div>

          {/* Order Information */}
          <div className="mt-4 flex flex-wrap gap-6 text-sm text-gray-500">
            {/* Date */}
            <div className="flex items-center gap-2">
              <Calendar size={16} />

              <span>{createdDate}</span>
            </div>

            {/* Items */}
            <span>
              {itemCount} Item
              {itemCount !== 1 ? "s" : ""}
            </span>

            {/* Total */}
            <span className="font-semibold text-gray-900">
              ${totalAmount.toFixed(2)}
            </span>
          </div>

          {/* Payment */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <CreditCard size={16} />

            <span>Payment:</span>

            <strong className="text-gray-700">
              {order?.paymentMethod || "-"}
            </strong>

            <span>•</span>

            <strong className="text-gray-700">
              {order?.paymentStatus || "-"}
            </strong>
          </div>

          {/* Shipping Address */}
          {order?.shippingAddress && (
            <p className="mt-2 max-w-xl truncate text-sm text-gray-400">
              Shipping: {order.shippingAddress}
            </p>
          )}
        </div>

        {/* Right */}
        <Link
          to={`/orders/${order.id}`}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-rose-600 px-5 py-3 font-semibold text-white transition hover:bg-rose-700"
        >
          View Details
          <ChevronRight size={18} />
        </Link>
      </div>
    </div>
  );
}
