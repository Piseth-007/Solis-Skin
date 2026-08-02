import api from "./axios";

export const getCustomers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const getCustomer = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const updateCustomer = async (id, data) => {
  const response = await api.put(`/users/${id}`, data);
  return response.data;
};

export const deleteCustomer = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};