import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";

import { useOrders } from "../context/OrderContext";
import { useReviews } from "../context/ReviewContext";

import ReviewForm from "../components/reviews/ReviewForm";

export default function WriteReview() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const { getOrder } = useOrders();
  const { getOrderReview } = useReviews();

  const order = getOrder(orderId);

  // Order not found
  if (!order) {
    return (
      <div className="mx-auto max-w-3xl py-20 text-center">
        <h1 className="text-3xl font-bold">Order Not Found</h1>

        <button
          onClick={() => navigate("/orders")}
          className="mt-8 rounded-xl bg-rose-600 px-6 py-3 text-white hover:bg-rose-700"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  // Only delivered orders can be reviewed
  if (order.status !== "Delivered") {
    return (
      <div className="mx-auto max-w-3xl py-20 text-center">
        <h1 className="text-3xl font-bold">Reviews Not Available</h1>

        <p className="mt-4 text-gray-500">
          You can review products only after your order has been delivered.
        </p>

        <button
          onClick={() => navigate(-1)}
          className="mt-8 rounded-xl bg-rose-600 px-6 py-3 text-white hover:bg-rose-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-10 min-h-screen">
      <div className="mx-auto max-w-4xl px-4">
        {/* Header */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-rose-600"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <h1 className="mb-2 text-4xl font-bold">Write Review</h1>

        <p className="mb-10 text-gray-500">
          Share your experience with the products you purchased.
        </p>

        {order.items.map((product) => {
          const existingReview = getOrderReview(order.id, product.id);

          if (existingReview) {
            return (
              <div
                key={product.id}
                className="mb-8 rounded-3xl border border-green-200 bg-green-50 p-6"
              >
                <div className="flex items-center gap-4">
                  <CheckCircle size={40} className="text-green-600" />

                  <div>
                    <h2 className="text-xl font-bold text-green-700">
                      {product.name}
                    </h2>

                    <p className="mt-1 text-gray-600">
                      You've already submitted a review for this product.
                    </p>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div key={product.id} className="mb-10">
              <ReviewForm order={order} product={product} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
