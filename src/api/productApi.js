import api, { API_BASE_URL } from "./axios";

/**
 * Get product array from API response
 */
export const getProductList = (response) => {
  if (Array.isArray(response)) {
    return response;
  }

  return response?.content || [];
};

/**
 * Convert:
 * http://localhost:8080/api/v1
 *
 * to:
 * http://localhost:8080
 */
const API_ORIGIN = API_BASE_URL.replace(/\/api\/v1\/?$/, "");

/**
 * Convert backend product to frontend product
 */
export const toProductView = (product) => {
  const imageUrl = product.imageUrl
    ? product.imageUrl.startsWith("http")
      ? product.imageUrl
      : `${API_ORIGIN}${product.imageUrl}`
    : "/placeholder.png";

  return {
    ...product,

    // Image
    imageUrl: imageUrl,
    image: imageUrl,

    // Brand
    brand: product.brand?.name || product.brandName || "",

    // Category
    category: product.category?.name || product.categoryName || "",

    // Optional frontend fields
    rating: product.rating ?? 5,
    reviewCount: product.reviewCount ?? 0,
    discount: product.discount ?? 0,
    oldPrice: product.oldPrice ?? null,
    isNew: product.isNew ?? false,

    skinType: product.skinType ?? "",
    weight: product.weight ?? "",

    ingredients: product.ingredients ?? [],
    benefits: product.benefits ?? [],
    howToUse: product.howToUse ?? [],
    gallery: product.gallery ?? [],
  };
};

/**
 * ============================
 * Get ONE Product Page
 * ============================
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
 * ============================
 * Get ALL Products
 * ============================
 */
export const getAllProducts = async () => {
  try {
    const allProducts = [];

    // First request
    const firstResponse = await getProducts(0, 10, "id,desc");

    console.log("PRODUCT PAGE 0:", firstResponse);

    const firstProducts = getProductList(firstResponse);

    allProducts.push(...firstProducts);

    // Get total pages
    const totalPages = firstResponse?.totalPages || 1;

    console.log("TOTAL PRODUCT PAGES:", totalPages);

    // Get remaining pages
    for (let page = 1; page < totalPages; page++) {
      const response = await getProducts(page, 10, "id,desc");

      console.log(`PRODUCT PAGE ${page}:`, response);

      allProducts.push(...getProductList(response));
    }

    console.log("ALL PRODUCTS:", allProducts);

    return allProducts.map(toProductView);
  } catch (error) {
    console.error("GET ALL PRODUCTS ERROR:", error);

    throw error;
  }
};

/**
 * ============================
 * Get Product By ID
 * ============================
 */
export const getProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);

  return toProductView(data);
};

/**
 * ============================
 * Create Product
 * ============================
 */
export const createProduct = async (formData) => {
  const { data } = await api.post("/products", formData);

  return toProductView(data);
};

/**
 * ============================
 * Update Product
 * ============================
 */
export const updateProduct = async (id, formData) => {
  const { data } = await api.put(`/products/${id}`, formData);

  return toProductView(data);
};

/**
 * ============================
 * Delete Product
 * ============================
 */
export const deleteProduct = async (id) => {
  await api.delete(`/products/${id}`);
};
