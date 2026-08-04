import { useEffect, useState } from "react";
import { getOrders, deleteOrder } from "../../api/orderApi";
import { getUsers } from "../../api/userApi"; // adjust path if different
import OrderModal from "../components/orders/OrderModal";
import OrderTable from "../components/orders/OrderTable";

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalMode, setModalMode] = useState(null); // "view" | "edit" | null

  useEffect(() => {
    loadOrders();
    loadUsers();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error("Failed to load orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      const map = {};
      data.forEach((u) => {
        map[u.id] = u;
      });
      setUsers(map);
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  };

  const handleView = (order) => {
    setSelectedOrder(order);
    setModalMode("view");
  };

  const handleUpdate = (order) => {
    setSelectedOrder(order);
    setModalMode("edit");
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setModalMode(null);
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
        users={users}
        onView={handleView}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />

      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          mode={modalMode}
          onClose={closeModal}
          onSaved={loadOrders}
        />
      )}
    </div>
  );
}
