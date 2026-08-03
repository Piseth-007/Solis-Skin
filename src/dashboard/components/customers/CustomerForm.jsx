import { useEffect, useState } from "react";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  role: "ROLE_USER",
  active: true,
};

export default function CustomerForm({
  customer = null,
  onSubmit,
  onCancel,
  loading = false,
}) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (customer) {
      setForm({
        fullName: customer.fullName || "",
        email: customer.email || "",
        phone: customer.phone || "",
        address: customer.address || "",
        role: customer.role || "ROLE_USER",
        active: customer.active ?? true,
      });
    } else {
      setForm(initialForm);
    }
  }, [customer]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Full Name
        </label>

        <input
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Enter full name"
          required
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-pink-500 focus:ring-4 focus:ring-pink-100"
        />
      </div>

      {/* Email */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Email Address
        </label>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="example@email.com"
          required
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-pink-500 focus:ring-4 focus:ring-pink-100"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Phone Number
        </label>

        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="012345678"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-pink-500 focus:ring-4 focus:ring-pink-100"
        />
      </div>

      {/* Address */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Address
        </label>

        <textarea
          rows={3}
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Enter address"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-pink-500 focus:ring-4 focus:ring-pink-100"
        />
      </div>

      {/* Role & Status */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Role */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Role
          </label>

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-pink-500 focus:ring-4 focus:ring-pink-100"
          >
            <option value="ROLE_USER">Customer</option>
            <option value="ROLE_ADMIN">Administrator</option>
          </select>
        </div>

        {/* Status */}
        <div className="flex items-end">
          <label className="flex w-full cursor-pointer items-center gap-3 rounded-xl border border-slate-300 px-4 py-3">
            <input
              type="checkbox"
              name="active"
              checked={form.active}
              onChange={handleChange}
              className="h-5 w-5 accent-pink-600"
            />

            <span className="font-medium text-slate-700">Active Account</span>
          </label>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 border-t pt-6">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="rounded-xl border border-slate-300 px-5 py-2.5 font-medium transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-pink-600 px-6 py-2.5 font-medium text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : customer
              ? "Update Customer"
              : "Create Customer"}
        </button>
      </div>
    </form>
  );
}
