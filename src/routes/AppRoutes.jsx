import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

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
import ScrollToTop from "../components/common/ScrollToTop";
import ProtectedRoute from "./ProtectedRoute";
import WriteReview from "../pages/WriteReview";

import Categories from "../pages/Categories";
import CategoryProducts from "../pages/CategoryProducts";
export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* Public Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:slug" element={<CategoryProducts />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<OrderDetail />} />
            <Route path="/review/:orderId" element={<WriteReview />} />
          </Route>
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}
