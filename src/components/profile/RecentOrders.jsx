import { ArrowRight, Package } from "lucide-react";
import { Link } from "react-router-dom";

const STATUS_STYLES = {
  PENDING: "bg-gray-100 text-gray-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  PACKING: "bg-indigo-100 text-indigo-700",
  SHIPPING: "bg-yellow-100 text-yellow-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function RecentOrders({ orders = [] }) {
  // Latest orders first
  const latestOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 3);

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">Recent Orders</h2>

        <Link
          to="/orders"
          className="text-sm font-semibold text-rose-600 hover:underline"
        >
          View All
        </Link>
      </div>

      {/* Empty */}
      {latestOrders.length === 0 ? (
        <div className="py-6 text-center">
          <Package size={40} className="mx-auto mb-3 text-gray-300" />

          <p className="text-sm text-gray-500">No orders yet.</p>

          <Link
            to="/shop"
            className="mt-4 inline-block text-sm font-semibold text-rose-600 hover:underline"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {latestOrders.map((order) => {
            const firstItem = order.items?.[0];

            const itemLabel = firstItem
              ? order.items.length > 1
                ? `${firstItem.productName} +${order.items.length - 1} more`
                : firstItem.productName
              : "Order";

            const status = order.status?.toUpperCase() || "PENDING";

            const statusStyle =
              STATUS_STYLES[status] || "bg-gray-100 text-gray-700";

            return (
              <Link
                key={order.id}
                to={`/orders/${order.id}`}
                className="block rounded-2xl border border-gray-100 p-4 transition hover:border-rose-300 hover:shadow-sm"
              >
                {/* Top */}
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{itemLabel}</p>

                    <p className="mt-1 text-sm text-gray-500">
                      {order.orderNumber}
                    </p>

                    {/* Date */}
                    {order.createdAt && (
                      <p className="mt-1 text-xs text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  <Package size={20} className="shrink-0 text-rose-500" />
                </div>

                {/* Bottom */}
                <div className="mt-4 flex items-center justify-between">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle}`}
                  >
                    {status}
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="font-bold">
                      ${Number(order.totalAmount || 0).toFixed(2)}
                    </span>

                    <ArrowRight size={16} className="text-gray-400" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
