import { useEffect, useState } from "react";
import { Camera, Mail, Phone, User, Calendar, Save } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { updateUser } from "../../api/userApi";
import AvatarUploader from "./AvatarUploader";

export default function PersonalInfoCard({ user, onUpdate }) {
  const { user: authUser, updateUser: updateAuthUser } = useAuth();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    birthday: "",
    gender: "",
  });
  const [saving, setSaving] = useState(false);

  // Sync form when the fetched user profile arrives/changes
  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        birthday: user.birthday || "",
        gender: user.gender || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authUser?.userId) return;

    setSaving(true);
    try {
      // NOTE: backend User entity currently has no birthday/gender fields —
      // only fullName/email/phone/address will actually persist.
      const updated = await updateUser(authUser.userId, {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        address: form.address,
      });

      updateAuthUser({
        fullName: updated.fullName,
        email: updated.email,
      });

      onUpdate?.(); // let parent refresh its copy of profile data

      alert("Profile updated successfully.");
    } catch (err) {
      console.error("Failed to update profile:", err);
      const msg = err.response?.data?.message || "Failed to update profile.";
      alert(msg);
    } finally {
      setSaving(false);
    }
  };

  const initials =
    form.fullName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Personal Information</h2>
          <p className="mt-1 text-gray-500">Update your account information.</p>
        </div>
      </div>

      <AvatarUploader
        name={form.fullName}
        image=""
        onChange={(file) => {
          console.log(file);
          // Future: uploadAvatar(file)
        }}
      />

      <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
        <InputField
          icon={<User size={18} />}
          label="Full Name"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
        />

        <InputField
          icon={<Mail size={18} />}
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <InputField
          icon={<Phone size={18} />}
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />

        <InputField
          label="Address"
          name="address"
          value={form.address}
          onChange={handleChange}
        />

        <InputField
          icon={<Calendar size={18} />}
          label="Birthday"
          type="date"
          name="birthday"
          value={form.birthday}
          onChange={handleChange}
        />

        <div>
          <label className="mb-2 block font-medium">Gender</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-rose-500"
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Prefer not to say</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-rose-600 px-8 py-3 font-semibold text-white transition hover:bg-rose-700 disabled:opacity-50"
          >
            <Save size={18} />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

function InputField({ label, icon, type = "text", ...props }) {
  return (
    <div>
      <label className="mb-2 block font-medium">{label}</label>
      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}
        <input
          type={type}
          {...props}
          className={`w-full rounded-xl border border-gray-200 py-3 ${icon ? "pl-12" : "pl-4"} pr-4 outline-none transition focus:border-rose-500`}
        />
      </div>
    </div>
  );
}
