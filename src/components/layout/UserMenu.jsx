import { useState, useRef, useEffect } from "react";
import {
  User,
  ChevronDown,
  Heart,
  Package,
  Settings,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { useAuth } from "../../context/AuthContext";

export default function UserMenu() {
  const { user, logout, isAuthenticated } = useAuth();

  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isAuthenticated) {
    return (
      <Link
        to="/login"
        className="flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-gray-100"
      >
        <User size={20} />
      </Link>
    );
  }

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full p-1 transition hover:bg-gray-100"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 font-bold text-rose-600">
          {initials}
        </div>

        <div className="hidden text-left lg:block">
          <p className="text-sm font-semibold text-gray-900">{user?.name}</p>

          <p className="text-xs text-gray-500">Account</p>
        </div>

        <ChevronDown
          size={16}
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -10,
              scale: 0.98,
            }}
            transition={{
              duration: 0.2,
            }}
            className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="bg-linear-to-r from-rose-500 to-pink-500 p-5 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-lg font-bold">
                  {initials}
                </div>

                <div>
                  <p className="font-semibold">{user?.name}</p>

                  <p className="text-sm text-rose-100">{user?.email}</p>
                </div>
              </div>
            </div>

            <div className="py-2">
              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-5 py-3 transition hover:bg-gray-50"
              >
                <Settings size={18} />
                My Profile
              </Link>

              <Link
                to="/orders"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-5 py-3 transition hover:bg-gray-50"
              >
                <Package size={18} />
                My Orders
              </Link>

              <Link
                to="/wishlist"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-5 py-3 transition hover:bg-gray-50"
              >
                <Heart size={18} />
                Wishlist
              </Link>

              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="flex w-full items-center gap-3 border-t border-gray-200 px-5 py-3 text-left text-red-600 transition hover:bg-red-50"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
