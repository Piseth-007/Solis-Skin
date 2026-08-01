import api from "./axios";

export const getCart = async () => {
  const { data } = await api.get("/cart");
  return data;
};

export const addToCart = async (payload) => {
  const { data } = await api.post("/cart", payload);
  return data;
};

export const updateCartItem = async (id, payload) => {
  const { data } = await api.put(`/cart/${id}`, payload);
  return data;
};

export const removeCartItem = async (id) => {
  const { data } = await api.delete(`/cart/${id}`);
  return data;
};
