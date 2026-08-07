import api from "./axios";

/**
 * Get all brands
 */
export const getBrands = async () => {
  const { data } = await api.get("/brands");
  return data;
};

/**
 * Get brand by ID
 */
export const getBrandById = async (id) => {
  const { data } = await api.get(`/brands/${id}`);
  return data;
};
export const createBrand = async (formData) => {
  const { data } = await api.post("/brands", formData);
  return data;
};

export const updateBrand = async (id, formData) => {
  const { data } = await api.put(`/brands/${id}`, formData);
  return data;
};

/**
 * Delete Brand
 */
export const deleteBrand = async (id) => {
  await api.delete(`/brands/${id}`);
};
