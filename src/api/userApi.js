import api from "./axios";

/**
 * Get all users
 */
export async function getUsers() {
  const response = await api.get("/users");
  return response.data;
}

/**
 * Get user by ID
 */
export async function getUserById(id) {
  const response = await api.get(`/users/${id}`);
  return response.data;
}

/**
 * Create user
 */
export async function createUser(user) {
  const response = await api.post("/users", user);
  return response.data;
}

/**
 * Update user
 */
export async function updateUser(id, user) {
  const response = await api.put(`/users/${id}`, user);
  return response.data;
}

/**
 * Delete user
 */
export async function deleteUser(id) {
  const response = await api.delete(`/users/${id}`);
  return response.data;
}
