import { Bell, Search, UserCircle2, ChevronDown, Menu } from "lucide-react";
import { getCurrentUser } from "../../api/authApi";

export default function Header() {
  const user = getCurrentUser();

  return (
    <header className="sticky top-0 z-30 flex h-18 items-center justify-between border-b border-gray-200 bg-white px-6">
      {/* Left */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu */}
        <button className="rounded-lg p-2 transition hover:bg-gray-100 lg:hidden">
          <Menu size={22} />
        </button>

       
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        {/* Notification */}
        <button className="relative rounded-xl p-2 transition hover:bg-gray-100">
          <Bell size={22} />

          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500"></span>
        </button>

        {/* Profile */}
        <button className="flex items-center gap-3 rounded-xl px-2 py-1 transition hover:bg-gray-100">
          <UserCircle2 size={38} className="text-gray-500" />

          <div className="hidden text-left md:block">
            <p className="font-semibold text-gray-800">
              {user?.fullName || "Guest"}
            </p>

            <p className="text-sm capitalize text-gray-500">
              {user?.role?.toLowerCase() || "Administrator"}
            </p>
          </div>

          {/* <ChevronDown size={18} className="hidden text-gray-500 md:block" /> */}
        </button>
      </div>
    </header>
  );
}
