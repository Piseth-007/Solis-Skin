import {
  LayoutDashboard,
  Package,
  Tags,
  BadgePercent,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  UserCircle2,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../../api/authApi";

const menus = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Products",
    path: "/dashboard/products",
    icon: Package,
  },
  {
    name: "Categories",
    path: "/dashboard/categories",
    icon: Tags,
  },
  {
    name: "Brands",
    path: "/dashboard/brands",
    icon: BadgePercent,
  },
  {
    name: "Orders",
    path: "/dashboard/orders",
    icon: ShoppingCart,
  },
  {
    name: "Customers",
    path: "/dashboard/customers",
    icon: Users,
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="hidden w-72 border-r border-gray-200 bg-white lg:flex lg:flex-col">
      {/* Logo */}
      <div className="border-b border-gray-200 p-6">
        <h1 className="text-2xl font-bold tracking-wide text-rose-600">
          Solis Skin
        </h1>

        <p className="mt-1 text-sm text-gray-500">Admin Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 overflow-y-auto p-4">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.path}
              to={menu.path}
              end={menu.path === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                  isActive
                    ? "bg-rose-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-rose-50 hover:text-rose-600"
                }`
              }
            >
              <Icon size={20} />
              <span className="font-medium">{menu.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="border-t border-gray-200 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-700 transition hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}
