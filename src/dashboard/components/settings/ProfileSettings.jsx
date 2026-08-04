import { useEffect, useState } from "react";
import { getUserById, updateUser as updateUserApi } from "../../../api/userApi";
import { useAuth } from "../../../context/AuthContext"; // adjust path
import SettingCard from "./SettingCard";

export default function ProfileSettings() {
  const { user, updateUser: updateAuthUser } = useAuth();

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.userId) {
      setError("You must be logged in to view this page.");
      setLoading(false);
      return;
    }
    loadProfile();
  }, [user?.userId]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const data = await getUserById(user.userId);
      setProfile({
        fullName: data.fullName ?? "",
        email: data.email ?? "",
        phone: data.phone ?? "",
        address: data.address ?? "",
      });
    } catch (err) {
      console.error("Failed to load profile:", err);
      setError("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    if (!user?.userId) return;
    setSaving(true);
    try {
      const updated = await updateUserApi(user.userId, profile);
      updateAuthUser({
        fullName: updated.fullName,
        email: updated.email,
      }); // keep AuthContext/localStorage in sync
      alert("Profile updated successfully.");
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <SettingCard title="Profile Settings" description="Loading...">
        <p className="text-sm text-gray-500">Loading profile...</p>
      </SettingCard>
    );
  }

  if (error) {
    return (
      <SettingCard title="Profile Settings" description={error}>
        <p className="text-sm text-red-600">{error}</p>
      </SettingCard>
    );
  }

  return (
    <SettingCard
      title="Profile Settings"
      description="Update your profile information."
      onSave={handleSave}
      saving={saving}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={profile.fullName}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={profile.address}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2 text-sm"
          />
        </div>
      </div>
    </SettingCard>
  );
}
