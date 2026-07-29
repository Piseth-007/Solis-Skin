import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { useOrders } from "../context/OrderContext";

import OrderItem from "../components/orders/OrderItem";
import OrderTimeline from "../components/orders/OrderTimeline";
import ShippingCard from "../components/orders/ShippingCard";
import PaymentCard from "../components/orders/PaymentCard";
import OrderSummary from "../components/orders/OrderSummary";
import OrderStatusBadge from "../components/orders/OrderStatusBadge";

export default function OrderDetail() {
  const navigate = useNavigate();

  const { id } = useParams();

  const { getOrder } = useOrders();

  const order = getOrder(id);

  if (!order) {
    return (
      <section className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Order not found.</h2>

          <Link
            to="/orders"
            className="mt-6 inline-flex rounded-xl bg-rose-600 px-6 py-3 font-semibold text-white hover:bg-rose-700"
          >
            Back to Orders
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-6xl px-6">
        <Link
          to="/orders"
          className="mb-8 inline-flex items-center gap-2 text-rose-600 hover:text-rose-700"
        >
          <ArrowLeft size={18} />
          Back to Orders
        </Link>

        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Order #{order.id}</h1>

            <p className="mt-2 text-gray-500">Placed on {order.date}</p>
          </div>

          <OrderStatusBadge status={order.status} />
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Side */}
          <div className="space-y-6 lg:col-span-2">
            <OrderItem order={order} />

            <ShippingCard shipping={order.shippingAddress} />

            <PaymentCard order={order} />

            <OrderTimeline status={order.status} />
          </div>

          {/* Right Side */}
          <div className="space-y-4">
            <OrderSummary order={order} />

            {order.status === "Delivered" && (
              <button
                onClick={() => navigate(`/review/${order.id}`)}
                className="w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700"
              >
                 Write Review
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
