import { useState } from "react";
import { Camera, Mail, Phone, User, Calendar, Save } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import AvatarUploader from "./AvatarUploader";
export default function PersonalInfoCard() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    birthday: "",
    gender: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);

    // TODO:
    // update profile API
  };

  const initials =
    form.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      {/* Header */}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Personal Information</h2>

          <p className="mt-1 text-gray-500">Update your account information.</p>
        </div>
      </div>

      {/* Avatar */}

      <AvatarUploader
        name={form.name}
        image=""
        onChange={(file) => {
          console.log(file);

          // Future:
          // uploadAvatar(file)
        }}
      />

      {/* Form */}

      <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
        {/* Name */}

        <InputField
          icon={<User size={18} />}
          label="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        {/* Email */}

        <InputField
          icon={<Mail size={18} />}
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        {/* Phone */}

        <InputField
          icon={<Phone size={18} />}
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />

        {/* Birthday */}

        <InputField
          icon={<Calendar size={18} />}
          label="Birthday"
          type="date"
          name="birthday"
          value={form.birthday}
          onChange={handleChange}
        />

        {/* Gender */}

        <div className="md:col-span-2">
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

        {/* Save */}

        <div className="md:col-span-2">
          <button className="flex items-center gap-2 rounded-xl bg-rose-600 px-8 py-3 font-semibold text-white transition hover:bg-rose-700">
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

/* ---------------------------------- */

function InputField({ label, icon, type = "text", ...props }) {
  return (
    <div>
      <label className="mb-2 block font-medium">{label}</label>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>

        <input
          type={type}
          {...props}
          className="w-full rounded-xl border border-gray-200 py-3 pl-12 pr-4 outline-none transition focus:border-rose-500"
        />
      </div>
    </div>
  );
}
