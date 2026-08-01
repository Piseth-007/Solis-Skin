import api from "./axios";

export const getBrands = async () => {
  const { data } = await api.get("/brands");
  return data;
};

export const getBrandById = async (id) => {
  const { data } = await api.get(`/brands/${id}`);
  return data;
};

export const createBrand = async (payload) => {
  const { data } = await api.post("/brands", payload);
  return data;
};

export const updateBrand = async (id, payload) => {
  const { data } = await api.put(`/brands/${id}`, payload);
  return data;
};

export const deleteBrand = async (id) => {
  await api.delete(`/brands/${id}`);
};
