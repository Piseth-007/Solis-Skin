import { useState } from "react";
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log(form);

    // Backend registration will be added later
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Full Name */}
      <div>
        <label className="mb-2 block font-medium">Full Name</label>

        <div className="relative">
          <User
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            required
            className="w-full rounded-xl border py-3 pl-12 pr-4 outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="mb-2 block font-medium">Email</label>

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
            required
            placeholder="john@email.com"
            className="w-full rounded-xl border py-3 pl-12 pr-4 outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
          />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label className="mb-2 block font-medium">Phone Number</label>

        <div className="relative">
          <Phone
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+855 12 345 678"
            required
            className="w-full rounded-xl border py-3 pl-12 pr-4 outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="mb-2 block font-medium">Password</label>

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
            required
            className="w-full rounded-xl border py-3 pl-12 pr-12 outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label className="mb-2 block font-medium">Confirm Password</label>

        <div className="relative">
          <Lock
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="w-full rounded-xl border py-3 pl-12 pr-12 outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
          />

          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Terms */}
      <label className="flex items-start gap-2 text-sm text-gray-600">
        <input
          type="checkbox"
          name="agree"
          checked={form.agree}
          onChange={handleChange}
          required
          className="mt-1"
        />

        <span>I agree to the Terms & Conditions and Privacy Policy.</span>
      </label>

      {/* Register */}
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 py-3 font-semibold text-white transition hover:bg-rose-700"
      >
        Create Account
        <ArrowRight size={18} />
      </button>

      {/* Login */}
      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-rose-600 hover:underline"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}
