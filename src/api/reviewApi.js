import api from "./axios";

export const getReviews = async (productId) => {
  const { data } = await api.get(`/products/${productId}/reviews`);
  return data;
};

export const createReview = async (productId, review) => {
  const { data } = await api.post(
    `/products/${productId}/reviews`,
    review
  );

  return data;
};