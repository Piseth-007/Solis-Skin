import { createContext, useContext, useEffect, useState } from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("solis-orders");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("solis-orders", JSON.stringify(orders));
  }, [orders]);

  const placeOrder = (order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const getOrder = (id) => {
    return orders.find((order) => order.id === id);
  };

  const updateOrderStatus = (id, status) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? {
              ...order,
              status,
            }
          : order,
      ),
    );
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
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
