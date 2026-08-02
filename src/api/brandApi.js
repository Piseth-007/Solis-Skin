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

/**
 * Create Brand
 */
export const createBrand = async (formData) => {
  const { data } = await api.post("/brands", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

/**
 * Update Brand
 */
export const updateBrand = async (id, formData) => {
  const { data } = await api.put(`/brands/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

/**
 * Delete Brand
 */
export const deleteBrand = async (id) => {
  await api.delete(`/brands/${id}`);
};
