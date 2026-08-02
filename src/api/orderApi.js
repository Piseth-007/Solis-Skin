import api from "./axios";

/**
 * Get all orders
 */
export const getOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

export const createOrder = async (data) => {
  const response = await api.post("/orders", data);
  return response.data;
};

export const updateOrderStatus = async (id, status) => {
  const response = await api.put(`/orders/${id}/status`, null, {
    params: { status },
  });

  return response.data;
};

export const updatePaymentStatus = async (id, paymentStatus) => {
  const response = await api.put(`/orders/${id}/payment-status`, null, {
    params: { paymentStatus },
  });

  return response.data;
};

export const deleteOrder = async (id) => {
  const response = await api.delete(`/orders/${id}`);
  return response.data;
};
