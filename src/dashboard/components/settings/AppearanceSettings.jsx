import { useState } from "react";
import { Palette } from "lucide-react";
import SettingCard from "./SettingCard";

export default function AppearanceSettings() {
  const [settings, setSettings] = useState({
    theme: "light",
    language: "en",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "24",
    accentColor: "#ec4899",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    console.log(settings);

    // TODO:
    // await updateAppearanceSettings(settings);

    alert("Appearance settings updated.");
  };

  const colors = [
    "#ec4899",
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ef4444",
  ];

  return (
    <SettingCard
      title="Appearance Settings"
      description="Customize the dashboard appearance."
      onSave={handleSave}
    >
      <div className="mb-6 flex items-center gap-3 rounded-xl border border-pink-200 bg-pink-50 p-4">
        <Palette className="text-pink-600" />

        <p className="text-sm text-pink-700">
          Personalize how the dashboard looks and feels.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Theme */}
        <div>
          <label className="mb-2 block text-sm font-medium">Theme</label>

          <select
            name="theme"
            value={settings.theme}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-pink-500 focus:outline-none"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>

        {/* Language */}
        <div>
          <label className="mb-2 block text-sm font-medium">Language</label>

          <select
            name="language"
            value={settings.language}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-pink-500 focus:outline-none"
          >
            <option value="en">English</option>
            <option value="km">Khmer</option>
          </select>
        </div>

        {/* Date Format */}
        <div>
          <label className="mb-2 block text-sm font-medium">Date Format</label>

          <select
            name="dateFormat"
            value={settings.dateFormat}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-pink-500 focus:outline-none"
          >
            <option>DD/MM/YYYY</option>
            <option>MM/DD/YYYY</option>
            <option>YYYY-MM-DD</option>
          </select>
        </div>

        {/* Time Format */}
        <div>
          <label className="mb-2 block text-sm font-medium">Time Format</label>

          <select
            name="timeFormat"
            value={settings.timeFormat}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-pink-500 focus:outline-none"
          >
            <option value="12">12 Hours</option>
            <option value="24">24 Hours</option>
          </select>
        </div>
      </div>

      {/* Accent Color */}
      <div className="mt-8">
        <label className="mb-4 block text-sm font-medium">Accent Color</label>

        <div className="flex gap-4">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() =>
                setSettings((prev) => ({
                  ...prev,
                  accentColor: color,
                }))
              }
              className={`h-10 w-10 rounded-full border-4 transition ${
                settings.accentColor === color
                  ? "border-slate-900 scale-110"
                  : "border-transparent"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </SettingCard>
  );
}
