import { useState } from "react";
import { Bell } from "lucide-react";
import SettingCard from "./SettingCard";

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    orderNotification: true,
    customerRegistration: true,
    productReview: true,
    lowStockAlert: true,
    newsletter: false,
    marketingEmail: false,
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = async () => {
    console.log(settings);

    // TODO:
    // await updateNotificationSettings(settings);

    alert("Notification settings updated.");
  };

  const Toggle = ({ title, description, value, onChange }) => (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
      <div>
        <h3 className="font-medium text-slate-900">{title}</h3>

        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>

      <button
        onClick={onChange}
        className={`relative h-7 w-14 rounded-full transition ${
          value ? "bg-pink-600" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
            value ? "right-1" : "left-1"
          }`}
        />
      </button>
    </div>
  );

  return (
    <SettingCard
      title="Notification Settings"
      description="Choose which notifications you want to receive."
      onSave={handleSave}
    >
      <div className="mb-6 flex items-center gap-3 rounded-xl border border-pink-200 bg-pink-50 p-4">
        <Bell className="text-pink-600" />
        <p className="text-sm text-pink-700">
          Stay informed by enabling important system notifications.
        </p>
      </div>

      <div className="space-y-4">
        <Toggle
          title="Order Notifications"
          description="Receive notifications when new orders are placed."
          value={settings.orderNotification}
          onChange={() => handleToggle("orderNotification")}
        />

        <Toggle
          title="Customer Registration"
          description="Notify when a new customer registers."
          value={settings.customerRegistration}
          onChange={() => handleToggle("customerRegistration")}
        />

        <Toggle
          title="Product Reviews"
          description="Receive notifications for new product reviews."
          value={settings.productReview}
          onChange={() => handleToggle("productReview")}
        />

        <Toggle
          title="Low Stock Alerts"
          description="Notify when product inventory is running low."
          value={settings.lowStockAlert}
          onChange={() => handleToggle("lowStockAlert")}
        />

        <Toggle
          title="Newsletter"
          description="Receive platform news and announcements."
          value={settings.newsletter}
          onChange={() => handleToggle("newsletter")}
        />

        <Toggle
          title="Marketing Emails"
          description="Receive promotional emails and campaigns."
          value={settings.marketingEmail}
          onChange={() => handleToggle("marketingEmail")}
        />
      </div>
    </SettingCard>
  );
}
