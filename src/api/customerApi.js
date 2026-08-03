import api from "./axios";

/**
 * Get all customers
 */
export const getCustomers = async () => {
  const { data } = await api.get("/users");
  return data;
};

/**
 * Get customer by ID
 */
export const getCustomer = async (id) => {
  const { data } = await api.get(`/users/${id}`);
  return data;
};

/**
 * Create customer
 */
export const createCustomer = async (payload) => {
  const { data } = await api.post("/users", payload);
  return data;
};

/**
 * Update customer
 */
export const updateCustomer = async (id, payload) => {
  const { data } = await api.put(`/users/${id}`, payload);
  return data;
};

/**
 * Delete customer
 */
export const deleteCustomer = async (id) => {
  const { data } = await api.delete(`/users/${id}`);
  return data;
};
