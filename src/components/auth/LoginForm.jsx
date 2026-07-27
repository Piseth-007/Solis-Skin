import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Demo login
    login(
      {
        id: 1,
        name: "John Doe",
        email: form.email,
      },
      "demo-jwt-token",
    );

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email */}
      <div>
        <label className="mb-2 block font-medium text-gray-700">
          Email Address
        </label>

        <div className="relative">
          <Mail
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
            required
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="mb-2 block font-medium text-gray-700">Password</label>

        <div className="relative">
          <Lock
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-12 outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Remember + Forgot */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            name="remember"
            checked={form.remember}
            onChange={handleChange}
            className="rounded"
          />
          Remember Me
        </label>

        <Link
          to="/forgot-password"
          className="text-sm font-medium text-rose-600 hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      {/* Login Button */}
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 py-3 font-semibold text-white transition hover:bg-rose-700"
      >
        Sign In
        <ArrowRight size={18} />
      </button>

      {/* Divider */}
      <div className="relative text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t"></div>
        </div>

        <span className="relative bg-white px-4 text-sm text-gray-500">OR</span>
      </div>

      {/* Google Button */}
      <button
        type="button"
        className="w-full rounded-xl border border-gray-300 py-3 font-medium transition hover:bg-gray-50"
      >
        Continue with Google
      </button>

      {/* Register Link */}
      <p className="text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-rose-600 hover:underline"
        >
          Create Account
        </Link>
      </p>
    </form>
  );
}
