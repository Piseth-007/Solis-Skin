import { ArrowRight, Package } from "lucide-react";

const orders = [
  {
    id: "#1023",
    product: "Vitamin C Serum",
    status: "Delivered",
    price: "$78",
  },
  {
    id: "#1022",
    product: "Hydrating Cleanser",
    status: "Shipping",
    price: "$42",
  },
  {
    id: "#1021",
    product: "Sunscreen SPF50",
    status: "Processing",
    price: "$24",
  },
];

export default function RecentOrders() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">Recent Orders</h2>

        <button className="text-sm font-semibold text-rose-600 hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-2xl border border-gray-100 p-4 transition hover:border-rose-300"
          >
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">{order.product}</p>

                <p className="text-sm text-gray-500">{order.id}</p>
              </div>

              <Package className="text-rose-500" />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : order.status === "Shipping"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                }`}
              >
                {order.status}
              </span>

              <div className="flex items-center gap-2">
                <span className="font-bold">{order.price}</span>

                <ArrowRight size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
