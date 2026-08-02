import { useEffect, useState } from "react";

import { Package, ShoppingCart, Users, Layers } from "lucide-react";

import { getDashboardStats } from "../../api/dashboardApi";

const cardConfig = [
  {
    key: "products",
    title: "Products",
    icon: Package,
    color: "bg-blue-500",
  },
  {
    key: "categories",
    title: "Categories",
    icon: Layers,
    color: "bg-green-500",
  },
  {
    key: "orders",
    title: "Orders",
    icon: ShoppingCart,
    color: "bg-amber-500",
  },
  {
    key: "customers",
    title: "Customers",
    icon: Users,
    color: "bg-rose-500",
  },
];

export default function DashboardHome() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);

      const data = await getDashboardStats();

      setStats(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-80 items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

        <p className="mt-2 text-gray-500">
          Welcome back to the Solis Skin Admin Panel.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {cardConfig.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.key}
              className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{item.title}</p>

                  <h2 className="mt-2 text-3xl font-bold">{stats[item.key]}</h2>
                </div>

                <div className={`${item.color} rounded-xl p-4 text-white`}>
                  <Icon size={26} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sales */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold">Sales Overview</h2>

          <div className="flex h-72 items-center justify-center rounded-xl border-2 border-dashed border-gray-300 text-gray-400">
            Chart Coming Soon
          </div>
        </div>

        {/* Recent Orders */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Recent Orders</h2>

          <div className="space-y-3">
            {stats.recentOrders.length === 0 ? (
              <div className="text-sm text-gray-500">No orders found.</div>
            ) : (
              stats.recentOrders.map((order) => (
                <div key={order.id} className="rounded-lg bg-gray-50 p-3">
                  <div className="font-medium">Order #{order.id}</div>

                  <div className="text-sm text-gray-500">
                    {order.customer?.fullName || "Unknown Customer"}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
