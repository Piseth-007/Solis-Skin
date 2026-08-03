import { useState } from "react";
import { User, Store, Shield, Bell, Palette } from "lucide-react";

import ProfileSettings from "../components/settings/ProfileSettings";
import StoreSettings from "../components/settings/StoreSettings";
import SecuritySettings from "../components/settings/SecuritySettings";
import NotificationSettings from "../components/settings/NotificationSettings";
import AppearanceSettings from "../components/settings/AppearanceSettings";

const tabs = [
  {
    id: "profile",
    label: "Profile",
    icon: User,
  },
  {
    id: "store",
    label: "Store",
    icon: Store,
  },
  {
    id: "security",
    label: "Security",
    icon: Shield,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: Palette,
  },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSettings />;

      case "store":
        return <StoreSettings />;

      case "security":
        return <SecuritySettings />;

      case "notifications":
        return <NotificationSettings />;

      case "appearance":
        return <AppearanceSettings />;

      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>

        <p className="mt-2 text-slate-500">
          Manage your account, store, security, and application preferences.
        </p>
      </div>

      {/* Content */}
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition ${
                    activeTab === tab.id
                      ? "bg-pink-600 text-white shadow"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Icon size={20} />

                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Settings Content */}
        <div>{renderContent()}</div>
      </div>
    </div>
  );
}
