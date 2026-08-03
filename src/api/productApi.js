import api, { API_BASE_URL } from "./axios";

export const getProductList = (response) =>
  Array.isArray(response) ? response : response?.content || [];

const API_ORIGIN = API_BASE_URL.replace(/\/api\/v1\/?$/, "");

export const toProductView = (product) => {
  const imageUrl = product.imageUrl?.startsWith("http")
    ? product.imageUrl
    : product.imageUrl
      ? `${API_ORIGIN}${product.imageUrl}`
      : "/placeholder.png";

  return {
    ...product,
    imageUrl,
    image: imageUrl,
    brand: product.brand?.name || product.brandName || "",
    category: product.category?.name || product.categoryName || "",
    rating: product.rating ?? 5,
    reviewCount: product.reviewCount ?? 0,
    discount: product.discount ?? 0,
  };
};

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
 * Note: don't set Content-Type manually — axios needs to auto-generate
 * the multipart boundary from the FormData instance. Setting it yourself
 * strips the boundary and breaks server-side parsing.
 */
export const createProduct = async (formData) => {
  const { data } = await api.post("/products", formData);
  return data;
};

/**
 * Update Product (Multipart/FormData)
 */
export const updateProduct = async (id, formData) => {
  const { data } = await api.put(`/products/${id}`, formData);
  return data;
};

/**
 * Delete Product
 */
export const deleteProduct = async (id) => {
  await api.delete(`/products/${id}`);
};
