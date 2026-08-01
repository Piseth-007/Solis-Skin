import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

// =======================
// Store Pages
// =======================
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import OrderSuccess from "../pages/OrderSuccess";
import WishList from "../pages/WishList";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import Profile from "../pages/Profile";
import Orders from "../pages/Orders";
import OrderDetail from "../pages/OrdersDetail";
import WriteReview from "../pages/WriteReview";
import Categories from "../pages/Categories";
import CategoryProducts from "../pages/CategoryProducts";
import Brands from "../pages/Brands";
import BrandProducts from "../pages/BrandProducts";
import About from "../pages/About";
import Contact from "../pages/Contact";

// =======================
// Common
// =======================
import ScrollToTop from "../components/common/ScrollToTop";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

// =======================
// Dashboard
// =======================
import DashboardLayout from "../dashboard/layouts/DashboardLayout";
import DashboardHome from "../dashboard/pages/DashboardHome";
import ProductManagement from "../dashboard/pages/ProductMangement";
import CategoryManagement from "../dashboard/pages/CategoryManagement";
import BrandManagement from "../dashboard/pages/BrandManagement";
import OrderManagement from "../dashboard/pages/OrderManagement";
import CustomerManagement from "../dashboard/pages/CustomerManagement";
import Settings from "../dashboard/pages/Settings";

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* =======================
            Store Layout
        ======================= */}
        <Route element={<MainLayout />}>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:slug" element={<CategoryProducts />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected Customer */}
          <Route element={<ProtectedRoute />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<OrderDetail />} />
            <Route path="/review/:orderId" element={<WriteReview />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/brand/:slug" element={<BrandProducts />} />
          </Route>
        </Route>

        {/* =======================
            Authentication
        ======================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* =======================
            Admin Dashboard
        ======================= */}
        <Route element={<AdminRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />

            <Route path="products" element={<ProductManagement />} />

            <Route path="categories" element={<CategoryManagement />} />

            <Route path="brands" element={<BrandManagement />} />

            <Route path="orders" element={<OrderManagement />} />

            <Route path="customers" element={<CustomerManagement />} />

            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        {/* =======================
            404
        ======================= */}
        <Route
          path="*"
          element={
            <div className="flex min-h-screen items-center justify-center">
              <h1 className="text-4xl font-bold text-gray-500">
                404 | Page Not Found
              </h1>
            </div>
          }
        />
      </Routes>
    </>
  );
}
