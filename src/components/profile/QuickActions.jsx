import { Link } from "react-router-dom";
import {
  MapPin,
  Package,
  Heart,
  Lock,
  CreditCard,
  Bell,
  ChevronRight,
} from "lucide-react";

const actions = [
  {
    title: "My Addresses",
    description: "Manage shipping addresses",
    icon: MapPin,
    to: "/profile/addresses",
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "My Orders",
    description: "Track your purchases",
    icon: Package,
    to: "/profile/orders",
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Wishlist",
    description: "View saved products",
    icon: Heart,
    to: "/wishlist",
    color: "bg-rose-100 text-rose-600",
  },
  {
    title: "Security",
    description: "Password & account security",
    icon: Lock,
    to: "/profile/security",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Payment Methods",
    description: "Cards & payment options",
    icon: CreditCard,
    to: "/profile/payments",
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Notifications",
    description: "Email & push settings",
    icon: Bell,
    to: "/profile/notifications",
    color: "bg-orange-100 text-orange-600",
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold">Quick Actions</h2>

      <p className="mt-1 text-sm text-gray-500">
        Manage every part of your account.
      </p>

      <div className="mt-6 space-y-3">
        {actions.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              to={item.to}
              className="group flex items-center justify-between rounded-2xl border border-gray-100 p-4 transition hover:border-rose-300 hover:bg-rose-50"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}
                >
                  <Icon size={22} />
                </div>

                <div>
                  <h3 className="font-semibold">{item.title}</h3>

                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </div>

              <ChevronRight
                size={20}
                className="text-gray-400 transition group-hover:translate-x-1"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
