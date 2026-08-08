import { useState } from "react";
import OrderStatusBadge from "./OrderStatusBadge";
import PaymentStatusBadge from "./PaymentStatusBadge";

export default function OrderTable({
  orders = [],
  users = {},
  onView,
  onUpdate,
  onDelete,
}) {
  const [deletingId, setDeletingId] = useState(null);

  if (!orders.length) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center text-gray-500 shadow-sm">
        No orders found.
      </div>
    );
  }

  // Latest order first
  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const handleDelete = async (order) => {
    setDeletingId(order.id);

    try {
      await onDelete(order);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-6 py-4 font-semibold">Order #</th>

              <th className="px-6 py-4 font-semibold">Customer</th>

              <th className="px-6 py-4 font-semibold">Total</th>

              <th className="px-6 py-4 font-semibold">Payment</th>

              <th className="px-6 py-4 font-semibold">Status</th>

              <th className="px-6 py-4 font-semibold">Date</th>

              <th className="px-6 py-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {sortedOrders.map((order) => {
              const isDeleting = deletingId === order.id;

              return (
                <tr key={order.id} className="transition hover:bg-gray-50">
                  {/* Order */}
                  <td className="px-6 py-4 font-medium">
                    <button
                      onClick={() => onView(order)}
                      className="text-rose-600 hover:underline"
                    >
                      {order.orderNumber}
                    </button>
                  </td>

                  {/* Customer */}
                  <td className="px-6 py-4">
                    {users[order.userId]?.fullName ||
                      users[order.userId]?.email ||
                      "-"}
                  </td>

                  {/* Total */}
                  <td className="px-6 py-4 font-medium">
                    ${Number(order.totalAmount || 0).toFixed(2)}
                  </td>

                  {/* Payment */}
                  <td className="px-6 py-4">
                    <PaymentStatusBadge status={order.paymentStatus} />
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <OrderStatusBadge status={order.status} />
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>

                      <p className="text-xs text-gray-400">
                        {new Date(order.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => onView(order)}
                        className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                      >
                        View
                      </button>

                      <button
                        onClick={() => onUpdate(order)}
                        className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
                      >
                        Update
                      </button>

                      <button
                        onClick={() => handleDelete(order)}
                        disabled={isDeleting}
                        className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700 disabled:opacity-50"
                      >
                        {isDeleting ? "..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
