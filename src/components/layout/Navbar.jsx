import { useState } from "react";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishListContext";

import UserMenu from "./UserMenu";

export default function Navbar() {
  const { totalItems } = useCart();
  const { wishlistCount } = useWishlist();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Categories", path: "/categories" },
    { name: "Brands", path: "/brands" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-wide text-rose-600 sm:text-3xl"
          >
            SOLIS SKIN
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `relative font-medium transition ${
                    isActive
                      ? "text-rose-600"
                      : "text-gray-700 hover:text-rose-600"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.name}

                    {isActive && (
                      <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-rose-600" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search */}
            <button className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-gray-100">
              <Search size={20} />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-gray-100"
            >
              <Heart size={21} />

              {wishlistCount > 0 && (
                <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-600 px-1 text-xs font-bold text-white">
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-gray-100"
            >
              <ShoppingBag size={21} />

              {totalItems > 0 && (
                <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-600 px-1 text-xs font-bold text-white">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>

            {/* User */}
            <UserMenu />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-gray-100 lg:hidden"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div
        onClick={() => setMobileMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      />

      {/* Mobile Drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-72 flex-col bg-white shadow-2xl transition-transform duration-300 lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-xl font-bold text-rose-600">
            SOLIS SKIN
          </h2>

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col p-6">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 font-medium transition ${
                  isActive
                    ? "bg-rose-100 text-rose-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}