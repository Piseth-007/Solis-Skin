import { useEffect, useState } from "react";

import DashboardStats from "../components/dashboard/DashboardStats";
import RevenueChart from "../components/dashboard/RevenueChart";
import RecentOrders from "../components/dashboard/RecentOrders";
import TopProducts from "../components/dashboard/TopProducts";

import { getDashboardStats } from "../../api/dashboardApi";

export default function DashboardHome() {
  const [dashboard, setDashboard] = useState({
    products: 0,
    categories: 0,
    customers: 0,
    orders: 0,
    revenue: 0,

    monthlyRevenue: [],
    recentOrders: [],
    topProducts: [],
  });

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getDashboardStats();

      setDashboard({
        products: data.products ?? 0,
        categories: data.categories ?? 0,
        customers: data.customers ?? 0,
        orders: data.orders ?? 0,
        revenue: data.revenue ?? 0,

        monthlyRevenue: data.monthlyRevenue ?? [],
        recentOrders: data.recentOrders ?? [],
        topProducts: data.topProducts ?? [],
      });
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-pink-500 border-t-transparent"></div>

          <p className="mt-4 text-slate-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <h2 className="text-xl font-semibold text-red-600">{error}</h2>

        <button
          onClick={loadDashboard}
          className="mt-5 rounded-xl bg-pink-600 px-5 py-2 text-white hover:bg-pink-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>

        <p className="mt-2 text-slate-500">
          Welcome back to the Solis Skin Admin Dashboard.
        </p>
      </div>

      {/* Statistics */}
      <DashboardStats stats={dashboard} />

      {/* Revenue + Orders */}
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RevenueChart data={dashboard.monthlyRevenue} />
        </div>

        <RecentOrders orders={dashboard.recentOrders} />
      </div>

      {/* Top Products */}
      <div className="grid gap-6 xl:grid-cols-2">
        <TopProducts products={dashboard.topProducts} />

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Analytics</h2>

          <div className="mt-6 flex h-72 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 text-slate-400">
            More analytics coming soon...
          </div>
        </div>
      </div>
    </div>
  );
}
