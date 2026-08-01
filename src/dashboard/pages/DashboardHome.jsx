import { Package, ShoppingCart, Users, Layers } from "lucide-react";

const stats = [
  {
    title: "Products",
    value: 128,
    icon: Package,
    color: "bg-blue-500",
  },
  {
    title: "Categories",
    value: 12,
    icon: Layers,
    color: "bg-green-500",
  },
  {
    title: "Orders",
    value: 356,
    icon: ShoppingCart,
    color: "bg-amber-500",
  },
  {
    title: "Customers",
    value: 248,
    icon: Users,
    color: "bg-rose-500",
  },
];

export default function DashboardHome() {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

        <p className="mt-2 text-gray-500">
          Welcome back to the Solis Skin Admin Panel.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{item.title}</p>

                  <h2 className="mt-2 text-3xl font-bold">{item.value}</h2>
                </div>

                <div className={`${item.color} rounded-xl p-4 text-white`}>
                  <Icon size={26} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Placeholder Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold">Sales Overview</h2>

          <div className="flex h-72 items-center justify-center rounded-xl border-2 border-dashed border-gray-300 text-gray-400">
            Chart Coming Soon
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Recent Orders</h2>

          <div className="space-y-4">
            <div className="rounded-lg bg-gray-50 p-3">Order #1001</div>

            <div className="rounded-lg bg-gray-50 p-3">Order #1002</div>

            <div className="rounded-lg bg-gray-50 p-3">Order #1003</div>
          </div>
        </div>
      </div>
    </div>
  );
}
