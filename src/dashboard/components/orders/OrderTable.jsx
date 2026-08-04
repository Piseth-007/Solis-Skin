import OrderStatusBadge from "./OrderStatusBadge";
import PaymentStatusBadge from "./PaymentStatusBadge";

export default function OrderTable({
  orders = [],
  users = {},
  onView,
  onUpdate,
  onDelete,
}) {
  console.log("OrderTable orders:", orders);
  if (!orders.length) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
        No orders found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Order #
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Customer
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Total
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Payment
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Status
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Date
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{order.orderNumber}</td>

                <td className="px-6 py-4">
                  {users[order.userId]?.fullName ||
                    users[order.userId]?.email ||
                    "-"}
                </td>

                <td className="px-6 py-4 font-medium">
                  ${Number(order.totalAmount).toFixed(2)}
                </td>

                <td className="px-6 py-4">
                  <PaymentStatusBadge status={order.paymentStatus} />
                </td>

                <td className="px-6 py-4">
                  <OrderStatusBadge status={order.status} />
                </td>

                <td className="px-6 py-4">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

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
                      onClick={() => onDelete(order)}
                      className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
