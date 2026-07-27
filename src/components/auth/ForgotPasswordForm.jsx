import { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Call backend API
    console.log(email);

    setSent(true);
  };

  if (sent) {
    return (
      <div className="space-y-6 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <Mail className="text-green-600" size={36} />
        </div>

        <h2 className="text-2xl font-bold text-gray-900">Check Your Email</h2>

        <p className="text-gray-600">We've sent a password reset link to:</p>

        <p className="font-semibold text-rose-600">{email}</p>

        <Link
          to="/login"
          className="inline-flex items-center rounded-xl bg-rose-600 px-6 py-3 font-semibold text-white transition hover:bg-rose-700"
        >
          Back to Login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
          />
        </div>
      </div>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 py-3 font-semibold text-white transition hover:bg-rose-700"
      >
        Send Reset Link
        <ArrowRight size={18} />
      </button>

      <div className="text-center">
        <Link
          to="/login"
          className="text-sm font-medium text-rose-600 hover:underline"
        >
          Back to Login
        </Link>
      </div>
    </form>
  );
}
