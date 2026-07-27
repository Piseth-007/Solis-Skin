import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import CheckoutForm from "../components/checkout/CheckoutForm";
import PaymentMethod from "../components/checkout/PaymentMethod";
import OrderSummary from "../components/checkout/OrderSummary";
import OrderReviewModal from "../components/checkout/OrderReviewModal";

import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";

export default function Checkout() {
  const navigate = useNavigate();

  const { cart, totalPrice, clearCart } = useCart();
  const { placeOrder } = useOrders();

  const [customer, setCustomer] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [openReview, setOpenReview] = useState(false);

  const handlePlaceOrder = () => {
    if (
      !customer.fullName ||
      !customer.phone ||
      !customer.address ||
      !customer.city
    ) {
      toast.error("Please complete your shipping information.");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    const shipping = totalPrice >= 50 ? 0 : 5;
    const tax = totalPrice * 0.1;

    const order = {
      id: `ORD-${Date.now()}`,

      date: new Date().toLocaleString(),

      status: "Processing",

      paymentStatus: paymentMethod === "cod" ? "Pending" : "Paid",

      paymentMethod,

      shippingAddress: customer,

      items: cart,

      subtotal: totalPrice,

      shipping,

      tax,

      total: totalPrice + shipping + tax,
    };

    placeOrder(order);

    clearCart();

    toast.success("Order placed successfully!");

    setOpenReview(true);
  };

  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Checkout</h1>

          <p className="mt-2 text-gray-500">
            Complete your order by providing your shipping and payment
            information.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <CheckoutForm customer={customer} setCustomer={setCustomer} />

            <PaymentMethod
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />
          </div>

          <OrderSummary onPlaceOrder={handlePlaceOrder} />
        </div>
      </div>

      <OrderReviewModal
        open={openReview}
        onClose={() => {
          setOpenReview(false);
          navigate("/orders");
        }}
        customer={customer}
        paymentMethod={paymentMethod}
      />
    </section>
  );
}
