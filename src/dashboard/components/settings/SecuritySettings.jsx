import { useState } from "react";
import { Eye, EyeOff, Shield } from "lucide-react";
import SettingCard from "./SettingCard";
import { changePassword } from "../../../api/userApi";
import { useAuth } from "../../../context/AuthContext"; // adjust path if different

function PasswordInput({ label, name, value, onChange, visible, onToggle }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">{label}</label>
      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 focus:border-pink-500 focus:outline-none"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}

export default function SecuritySettings() {
  const { user } = useAuth();

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

  const [saving, setSaving] = useState(false);

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
    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }
    if (form.newPassword.length < 8) {
      alert("New password must be at least 8 characters.");
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    if (form.newPassword === form.currentPassword) {
      alert("New password must be different from current password.");
      return;
    }

    setSaving(true);
    try {
      await changePassword(user.userId, form.currentPassword, form.newPassword);
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      alert("Password updated successfully.");
    } catch (err) {
      console.error("Failed to update password:", err);
      const msg = err.response?.data?.message || "Failed to update password.";
      alert(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <SettingCard
      title="Security Settings"
      description="Change your account password."
      onSave={handleSave}
      saving={saving}
    >
      <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
        <div className="flex items-start gap-3">
          <Shield className="mt-0.5 text-blue-600" size={20} />
          <div>
            <h3 className="font-semibold text-blue-700">Password Security</h3>
            <p className="mt-1 text-sm text-blue-600">
              Use a strong password with at least 8 characters, including
              uppercase letters, lowercase letters, numbers, and special
              characters.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <PasswordInput
          label="Current Password"
          name="currentPassword"
          value={form.currentPassword}
          onChange={handleChange}
          visible={show.current}
          onToggle={() => togglePassword("current")}
        />

        <PasswordInput
          label="New Password"
          name="newPassword"
          value={form.newPassword}
          onChange={handleChange}
          visible={show.password}
          onToggle={() => togglePassword("password")}
        />

        <PasswordInput
          label="Confirm New Password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          visible={show.confirm}
          onToggle={() => togglePassword("confirm")}
        />
      </div>
    </SettingCard>
  );
}
