import { useEffect, useState } from "react";
import { getOrders, deleteOrder } from "../../api/orderApi";

import OrderTable from "../components/orders/OrderTable";

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);

      const response = await getOrders();

      setOrders(response.data);
    } catch (error) {
      console.error("Failed to load orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (order) => {
    setSelectedOrder(order);

    console.log("View:", order);
  };

  const handleUpdate = (order) => {
    setSelectedOrder(order);

    console.log("Update:", order);
  };

  const handleDelete = async (order) => {
    const confirmDelete = window.confirm(`Delete order ${order.orderNumber}?`);

    if (!confirmDelete) return;

    try {
      await deleteOrder(order.id);

      await loadOrders();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  if (loading) {
    return <div className="p-6">Loading orders...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Order Management</h1>

        <p className="text-gray-500 mt-1">Manage customer orders</p>
      </div>

      <OrderTable
        orders={orders}
        onView={handleView}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}
