import { useState } from "react";
import { Eye, EyeOff, Shield } from "lucide-react";
import SettingCard from "./SettingCard";

export default function SecuritySettings() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    current: false,
    password: false,
    confirm: false,
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const togglePassword = (field) => {
    setShow((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = async () => {
    if (form.newPassword !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log(form);

    // TODO:
    // await changePassword(form);

    setForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    alert("Password updated successfully.");
  };

  const PasswordInput = ({
    label,
    name,
    value,
    visible,
    toggleKey,
  }) => (
    <div>
      <label className="mb-2 block text-sm font-medium">
        {label}
      </label>

      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          name={name}
          value={value}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 focus:border-pink-500 focus:outline-none"
        />

        <button
          type="button"
          onClick={() => togglePassword(toggleKey)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );

  return (
    <SettingCard
      title="Security Settings"
      description="Change your account password."
      onSave={handleSave}
    >
      <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
        <div className="flex items-start gap-3">
          <Shield className="mt-0.5 text-blue-600" size={20} />

          <div>
            <h3 className="font-semibold text-blue-700">
              Password Security
            </h3>

            <p className="mt-1 text-sm text-blue-600">
              Use a strong password with at least 8 characters,
              including uppercase letters, lowercase letters,
              numbers, and special characters.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <PasswordInput
          label="Current Password"
          name="currentPassword"
          value={form.currentPassword}
          visible={show.current}
          toggleKey="current"
        />

        <PasswordInput
          label="New Password"
          name="newPassword"
          value={form.newPassword}
          visible={show.password}
          toggleKey="password"
        />

        <PasswordInput
          label="Confirm New Password"
          name="confirmPassword"
          value={form.confirmPassword}
          visible={show.confirm}
          toggleKey="confirm"
        />
      </div>
    </SettingCard>
)}  