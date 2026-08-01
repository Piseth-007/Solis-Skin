import api from "./axios";

/**
 * ===========================
 * Authentication API
 * ===========================
 */

/**
 * Login
 * POST /api/v1/auth/login
 */
export const login = async (email, password) => {
  try {
    const { data } = await api.post("/auth/login", {
      email,
      password,
    });

    return data;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

/**
 * Register
 * POST /api/v1/auth/register
 */
export const register = async (payload) => {
  try {
    const { data } = await api.post("/auth/register", payload);

    return data;
  } catch (error) {
    console.error("Register Error:", error);
    throw error;
  }
};

/**
 * ===========================
 * Local Storage Helpers
 * ===========================
 */

/**
 * Save authentication data
 */
export const saveAuth = (auth) => {
  localStorage.setItem("token", auth.token);

  localStorage.setItem(
    "user",
    JSON.stringify({
      userId: auth.userId,
      name: auth.name,
      email: auth.email,
      role: auth.role,
    }),
  );
};

/**
 * Get JWT Token
 */
export const getToken = () => {
  return localStorage.getItem("token");
};

/**
 * Get Logged User
 */
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};

/**
 * Check Login
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

/**
 * Check Admin Role
 */
export const isAdmin = () => {
  const user = getCurrentUser();

  return user?.role === "ADMIN";
};

/**
 * Logout
 */
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

/**
 * ===========================
 * Optional Future APIs
 * ===========================
 */

/**
 * Refresh Profile
 * Uncomment if backend provides:
 * GET /api/v1/users/me
 */

// export const getProfile = async () => {
//   const { data } = await api.get("/users/me");
//   return data;
// };

/**
 * Refresh Token
 * Uncomment if backend provides:
 * POST /api/v1/auth/refresh
 */

// export const refreshToken = async (refreshToken) => {
//   const { data } = await api.post("/auth/refresh", {
//     refreshToken,
//   });
//
//   return data;
// };
