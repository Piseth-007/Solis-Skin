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
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">Recent Orders</h2>

        <Link
          to="/orders"
          className="text-sm font-semibold text-rose-600 hover:underline"
        >
          View All
        </Link>
      </div>

      {orders.length === 0 ? (
        <p className="text-sm text-gray-500">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const firstItem = order.items?.[0];
            const itemLabel = firstItem
              ? order.items.length > 1
                ? `${firstItem.productName} +${order.items.length - 1} more`
                : firstItem.productName
              : "Order";

            return (
              <Link
                key={order.id}
                to={`/orders/${order.id}`}
                className="block rounded-2xl border border-gray-100 p-4 transition hover:border-rose-300"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold">{itemLabel}</p>
                    <p className="text-sm text-gray-500">{order.orderNumber}</p>
                  </div>

                  <Package className="text-rose-500" />
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      STATUS_STYLES[order.status] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.status}
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="font-bold">
                      ${Number(order.totalAmount).toFixed(2)}
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
