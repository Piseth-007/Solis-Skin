import { useState } from "react";
import SettingCard from "./SettingCard";

export default function StoreSettings() {
  const [store, setStore] = useState({
    storeName: "Solis Skin",
    email: "support@solisskin.com",
    phone: "+855 12 345 678",
    address: "Phnom Penh, Cambodia",
    currency: "USD",
    timezone: "Asia/Phnom_Penh",
    taxRate: 10,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setStore((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log(store);

    // TODO:
    // await updateStoreSettings(store);
  };

  return (
    <SettingCard
      title="Store Settings"
      description="Manage your store information."
      onSave={handleSave}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">Store Name</label>

          <input
            name="storeName"
            value={store.storeName}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-pink-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Store Email</label>

          <input
            type="email"
            name="email"
            value={store.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-pink-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Phone</label>

          <input
            name="phone"
            value={store.phone}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-pink-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Currency</label>

          <select
            name="currency"
            value={store.currency}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-pink-500 focus:outline-none"
          >
            <option value="USD">USD ($)</option>
            <option value="KHR">KHR (៛)</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Time Zone</label>

          <select
            name="timezone"
            value={store.timezone}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-pink-500 focus:outline-none"
          >
            <option value="Asia/Phnom_Penh">Asia/Phnom Penh</option>

            <option value="Asia/Bangkok">Asia/Bangkok</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Tax Rate (%)</label>

          <input
            type="number"
            name="taxRate"
            value={store.taxRate}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-pink-500 focus:outline-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">
            Store Address
          </label>

          <textarea
            rows={4}
            name="address"
            value={store.address}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-pink-500 focus:outline-none"
          />
        </div>
      </div>
    </SettingCard>
  );
}
