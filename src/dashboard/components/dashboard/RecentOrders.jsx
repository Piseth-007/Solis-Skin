import { ShoppingBag } from "lucide-react";

const statusStyles = {
  PENDING: "bg-yellow-100 text-yellow-700",
  PROCESSING: "bg-blue-100 text-blue-700",
  SHIPPED: "bg-indigo-100 text-indigo-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function RecentOrders({ orders = [] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Recent Orders
          </h2>

          <p className="mt-1 text-sm text-slate-500">Latest customer orders</p>
        </div>
      </div>

      {/* Empty State */}
      {orders.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center text-slate-500">
          <ShoppingBag size={42} className="mb-3 text-slate-300" />

          <p>No recent orders.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between rounded-xl border border-slate-100 p-4 transition hover:bg-slate-50"
            >
              {/* Left */}
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-100 text-pink-600 font-semibold">
                  #{order.id}
                </div>

                <div>
                  <h3 className="font-medium text-slate-900">
                    {order.customer?.fullName ?? "Guest Customer"}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "-"}
                  </p>
                </div>
              </div>

              {/* Right */}
              <div className="text-right">
                <h3 className="font-semibold text-slate-900">
                  ${Number(order.totalAmount ?? 0).toLocaleString()}
                </h3>

                <span
                  className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    statusStyles[order.status] ?? "bg-slate-100 text-slate-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
