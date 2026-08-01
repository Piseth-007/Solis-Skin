import api from "./axios";

/**
 * Get Products
 */
export const getProducts = async (page = 0, size = 10, sort = "id,desc") => {
  const { data } = await api.get("/products", {
    params: {
      page,
      size,
      sort,
    },
  });

  return data;
};

/**
 * Get Product By ID
 */
export const getProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

/**
 * Create Product (Multipart/FormData)
 */
export const createProduct = async (formData) => {
  const { data } = await api.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

/**
 * Update Product (Multipart/FormData)
 */
export const updateProduct = async (id, formData) => {
  const { data } = await api.put(`/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

/**
 * Delete Product
 */
export const deleteProduct = async (id) => {
  await api.delete(`/products/${id}`);
};
