import api from "./axios";

export const checkout = async (payload) => {
  const { data } = await api.post("/orders/checkout", payload);
  return data;
};

export const getOrders = async () => {
  const { data } = await api.get("/orders");
  return data;
};

export const getOrder = async (id) => {
  const { data } = await api.get(`/orders/${id}`);
  return data;
};