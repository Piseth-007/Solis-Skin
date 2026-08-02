import api from "./axios";

/**
 * Get all categories
 */
export const getCategories = async () => {
  const { data } = await api.get("/categories");
  return data;
};

/**
 * Get category by ID
 */
export const getCategoryById = async (id) => {
  const { data } = await api.get(`/categories/${id}`);
  return data;
};

/**
 * Create category
 */
export const createCategory = async (payload) => {
  const { data } = await api.post("/categories", payload);
  return data;
};

/**
 * Update category
 */
export const updateCategory = async (id, payload) => {
  const { data } = await api.put(`/categories/${id}`, payload);
  return data;
};

/**
 * Delete category
 */
export const deleteCategory = async (id) => {
  await api.delete(`/categories/${id}`);
};
