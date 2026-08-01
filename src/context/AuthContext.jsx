import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken) {
        setToken(storedToken);
      }

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to restore authentication:", error);

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Login
   * authResponse comes directly from Spring Boot
   */
  const login = (authResponse) => {
    const authUser = {
      userId: authResponse.userId,
      name: authResponse.name,
      email: authResponse.email,
      role: authResponse.role,
    };

    setUser(authUser);
    setToken(authResponse.token);

    localStorage.setItem("token", authResponse.token);
    localStorage.setItem("user", JSON.stringify(authUser));
  };

  /**
   * Logout
   */
  const logout = () => {
    setUser(null);
    setToken("");

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  /**
   * Update profile
   */
  const updateUser = (data) => {
    const updatedUser = {
      ...user,
      ...data,
    };

    setUser(updatedUser);

    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,

      login,
      logout,
      updateUser,

      isAuthenticated: !!token,
      isAdmin: user?.role === "ADMIN",
      isUser: user?.role === "USER",
    }),
    [user, token, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
