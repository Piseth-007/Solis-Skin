import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { login as loginApi } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const from = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const auth = await loginApi(form.email, form.password);

      login(auth);

      if (auth.role === "ADMIN") {
        navigate("/dashboard", { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-lg bg-red-100 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div>
        <label className="mb-2 block text-sm font-medium">Email</label>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-lg border px-4 py-3 focus:border-rose-500 focus:outline-none"
          placeholder="Enter your email"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Password</label>

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full rounded-lg border px-4 py-3 focus:border-rose-500 focus:outline-none"
          placeholder="Enter your password"
          required
        />
      </div>

      <div className="flex justify-end">
        <Link
          to="/forgot-password"
          className="text-sm text-rose-500 hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-rose-500 py-3 font-semibold text-white transition hover:bg-rose-600 disabled:opacity-50"
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>

      <p className="text-center text-sm">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-rose-500 hover:underline"
        >
          Register
        </Link>
      </p>
    </form>
  );
}
