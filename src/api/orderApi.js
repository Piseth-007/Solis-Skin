import api from "./axios";

export const getOrders = async () => {
  const { data } = await api.get("/orders");
  return data;
};

export const getOrderById = async (id) => {
  const { data } = await api.get(`/orders/${id}`);
  return data;
};

export const createOrder = async (order) => {
  const { data } = await api.post("/orders", order);
  return data;
};

export const updateOrderStatus = async (id, status) => {
  const { data } = await api.put(`/orders/${id}/status`, null, {
    params: { status },
  });

  return data;
};

export const updatePaymentStatus = async (id, paymentStatus) => {
  const { data } = await api.put(`/orders/${id}/payment-status`, null, {
    params: { paymentStatus },
  });

  return data;
};

export const deleteOrder = async (id) => {
  await api.delete(`/orders/${id}`);
};
