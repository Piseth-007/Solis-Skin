import { useState, useEffect } from "react";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishListContext";

import UserMenu from "./UserMenu";

export default function Navbar() {
  const { totalItems } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Categories", path: "/categories" },
    { name: "Brands", path: "/brands" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (!trimmed) return;

    navigate(`/shop?search=${encodeURIComponent(trimmed)}`);
    setSearchQuery("");
    setSearchOpen(false);
  };

  // Close on Escape key
  useEffect(() => {
    if (!searchOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen]);

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
            {/* Search Toggle */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-gray-100"
            >
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

      {/* Mobile Menu Overlay */}
      <div
        onClick={() => setMobileMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      {/* Mobile Drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-72 flex-col bg-white shadow-2xl transition-transform duration-300 lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-xl font-bold text-rose-600">SOLIS SKIN</h2>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

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

      {/* Search Modal */}
      {searchOpen && (
        <div
          onClick={() => {
            setSearchOpen(false);
            setSearchQuery("");
          }}
          className="fixed inset-0 z-60 flex items-start justify-center bg-black/50 px-4 pt-24 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl"
          >
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-3"
            >
              <Search size={22} className="text-gray-400" />
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 border-none text-lg outline-none placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </form>

            <p className="mt-4 text-xs text-gray-400">
              Press Enter to search, or Esc to close
            </p>
          </div>
        </div>
      )}
    </>
  );
}
