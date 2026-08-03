import { useEffect, useState } from "react";
import { getUserById, updateUser } from "../../../api/userApi";
import SettingCard from "./SettingCard";

export default function ProfileSettings() {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getUserById(currentUser.id);
      setProfile(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await updateUser(currentUser.id, profile);
      alert("Profile updated successfully.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SettingCard
      title="Profile Settings"
      description="Update your profile information."
      onSave={handleSave}
    >
      {/* Your form inputs */}
    </SettingCard>
  );
}
