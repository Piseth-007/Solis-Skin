import { createContext, useContext, useEffect, useState } from "react";
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus as updateStatusApi,
} from "../api/orderApi";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ============================
  // Load Orders
  // ============================
  const loadOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error("Failed to load orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // ============================
  // Create Order
  // ============================
  const placeOrder = async (orderRequest) => {
    try {
      const newOrder = await createOrder(orderRequest);

      setOrders((prev) => [newOrder, ...prev]);

      return newOrder;
    } catch (error) {
      console.error("Failed to create order:", error);
      throw error;
    }
  };

  // ============================
  // Get Order By ID
  // ============================
  const getOrder = async (id) => {
    try {
      return await getOrderById(id);
    } catch (error) {
      console.error("Failed to get order:", error);
      return null;
    }
  };

  // ============================
  // Update Status
  // ============================
  const updateOrderStatus = async (id, status) => {
    try {
      const updated = await updateStatusApi(id, status);

      setOrders((prev) =>
        prev.map((order) => (order.id === id ? updated : order)),
      );

      return updated;
    } catch (error) {
      console.error("Failed to update order status:", error);
      throw error;
    }
  };

  // ============================
  // Refresh Orders
  // ============================
  const refreshOrders = () => {
    loadOrders();
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        loadOrders,
        refreshOrders,
        placeOrder,
        getOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrderContext);
}
