export default function CheckoutForm({ customer, setCustomer }) {
  const handleChange = (e) => {
    setCustomer((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const inputClass =
    "w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-200";

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">Shipping Information</h2>

      <div className="grid gap-5 md:grid-cols-2">
        <input
          className={inputClass}
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={customer.fullName}
          onChange={handleChange}
        />

        <input
          className={inputClass}
          type="email"
          name="email"
          placeholder="Email"
          value={customer.email}
          onChange={handleChange}
        />

        <input
          className={inputClass}
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={customer.phone}
          onChange={handleChange}
        />

        <input
          className={inputClass}
          type="text"
          name="city"
          placeholder="City"
          value={customer.city}
          onChange={handleChange}
        />

        <input
          className={inputClass}
          type="text"
          name="province"
          placeholder="Province"
          value={customer.province}
          onChange={handleChange}
        />

        <input
          className={inputClass}
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={customer.postalCode}
          onChange={handleChange}
        />
      </div>

      <textarea
        className={`${inputClass} mt-5`}
        rows={4}
        name="address"
        placeholder="Street Address"
        value={customer.address}
        onChange={handleChange}
      />
    </div>
  );
}
