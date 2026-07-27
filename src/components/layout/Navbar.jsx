import { Search, Heart, ShoppingBag } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishListContext";

import UserMenu from "./UserMenu";

export default function Navbar() {
  const { totalItems } = useCart();
  const { wishlistCount } = useWishlist();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Categories", path: "/categories" },
    { name: "Brands", path: "/brands" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-wide text-rose-600"
        >
          SOLIS SKIN
        </Link>

        {/* Navigation */}
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

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <button className="flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-gray-100">
            <Search size={20} />
          </button>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-gray-100"
          >
            <Heart size={22} className="transition hover:text-rose-500" />

            {wishlistCount > 0 && (
              <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-600 px-1 text-xs font-bold text-white">
                {wishlistCount > 99 ? "99+" : wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-gray-100"
          >
            <ShoppingBag size={22} />

            {totalItems > 0 && (
              <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-600 px-1 text-xs font-bold text-white">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>

          {/* User Account */}
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
