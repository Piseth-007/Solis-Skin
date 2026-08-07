import { useEffect, useState } from "react";
import { getOrders } from "../api/orderApi";
import { useAuth } from "../context/AuthContext";

import OrderFilter from "../components/orders/OrderFilter";
import OrderCard from "../components/orders/OrderCard";
import EmptyOrders from "../components/orders/EmptyOrders";

export default function Orders() {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.userId) return;
    loadOrders();
  }, [user?.userId]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getOrders();
      // Filter to only this customer's own orders — getOrders() returns everyone's
      const myOrders = data.filter((order) => order.userId === user.userId);

      setOrders(myOrders);
    } catch (error) {
      console.error("Failed to load orders:", error);
      setError("Failed to load your orders.");
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter((order) => order.status === filter);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-red-600">{error}</p>
        <button
          onClick={loadOrders}
          className="rounded-xl bg-rose-600 px-5 py-2 text-white hover:bg-rose-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="mb-8 text-4xl font-bold">My Orders</h1>

        {orders.length > 0 && (
          <OrderFilter filter={filter} setFilter={setFilter} />
        )}

        <div className="mt-8 space-y-6">
          {filteredOrders.length === 0 ? (
            <EmptyOrders />
          ) : (
            filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
