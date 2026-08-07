import { useEffect, useState, useMemo } from "react";
import { Package, Clock, Truck, CheckCircle, XCircle } from "lucide-react";
import { getOrders, deleteOrder } from "../../api/orderApi";
import { getUsers } from "../../api/userApi";
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
      alert(error.response?.data?.message || "Failed to delete order.");
    }
  };

  const stats = useMemo(() => {
    const total = orders.length;
    const pending = orders.filter((o) => o.status === "PENDING").length;
    const inProgress = orders.filter((o) =>
      ["CONFIRMED", "PACKING", "SHIPPING"].includes(o.status),
    ).length;
    const delivered = orders.filter((o) => o.status === "DELIVERED").length;
    const cancelled = orders.filter((o) => o.status === "CANCELLED").length;
    return { total, pending, inProgress, delivered, cancelled };
  }, [orders]);

  if (loading) {
    return <div className="p-6">Loading orders...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Order Management</h1>
        <p className="text-gray-500 mt-1">Manage customer orders</p>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-5 md:grid-cols-5">
        <div className="rounded-xl bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <h2 className="mt-2 text-3xl font-bold">{stats.total}</h2>
            </div>
            <Package size={30} className="text-blue-500" />
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <h2 className="mt-2 text-3xl font-bold text-gray-600">
                {stats.pending}
              </h2>
            </div>
            <Clock size={30} className="text-gray-500" />
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">In Progress</p>
              <h2 className="mt-2 text-3xl font-bold text-amber-600">
                {stats.inProgress}
              </h2>
            </div>
            <Truck size={30} className="text-amber-500" />
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Delivered</p>
              <h2 className="mt-2 text-3xl font-bold text-green-600">
                {stats.delivered}
              </h2>
            </div>
            <CheckCircle size={30} className="text-green-500" />
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Cancelled</p>
              <h2 className="mt-2 text-3xl font-bold text-red-600">
                {stats.cancelled}
              </h2>
            </div>
            <XCircle size={30} className="text-red-500" />
          </div>
        </div>
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
