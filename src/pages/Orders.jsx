import { useMemo, useState } from "react";
import { useOrders } from "../context/OrderContext";

import OrderFilter from "../components/orders/OrderFilter";
import OrderCard from "../components/orders/OrderCard";
import EmptyOrders from "../components/orders/EmptyOrders";

export default function Orders() {
  const { orders } = useOrders();

  const [filter, setFilter] = useState("All");

  // Latest order first
  const sortedOrders = useMemo(() => {
    return [...orders].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [orders]);

  // Filter after sorting
  const filteredOrders = useMemo(() => {
    if (filter === "All") {
      return sortedOrders;
    }

    return sortedOrders.filter((order) => order.status === filter);
  }, [sortedOrders, filter]);

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
