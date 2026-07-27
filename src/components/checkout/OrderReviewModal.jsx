import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, CreditCard, MapPin, Package, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../context/CartContext";

export default function OrderReviewModal({
  open,
  onClose,
  customer,
  paymentMethod,
}) {
  const navigate = useNavigate();

  const { cart, totalPrice, clearCart } = useCart();

  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const paymentNames = {
    cod: "Cash on Delivery",
    card: "Credit / Debit Card",
    aba: "ABA Pay",
    acleda: "ACLEDA Bank",
  };

  const shipping = totalPrice >= 50 ? 0 : 5;
  const tax = totalPrice * 0.1;
  const total = totalPrice + shipping + tax;

  const handleConfirm = async () => {
    if (!agree) return;

    setLoading(true);

    // simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    clearCart();

    setLoading(false);

    onClose();

    navigate("/order-success");
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 30,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 30,
            }}
            transition={{
              duration: 0.25,
            }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white shadow-2xl"
          >
            {/* Header */}

            <div className="flex items-center justify-between border-b p-6">
              <h2 className="text-2xl font-bold">Review Your Order</h2>

              <button
                onClick={onClose}
                className="rounded-full p-2 transition hover:bg-gray-100"
              >
                <X />
              </button>
            </div>

            {/* Body */}

            <div className="max-h-[70vh] space-y-8 overflow-y-auto p-6">
              {/* Shipping */}

              <div>
                <div className="mb-3 flex items-center gap-2">
                  <MapPin className="text-rose-600" size={20} />

                  <h3 className="font-semibold">Shipping Information</h3>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p>
                    <strong>Name:</strong> {customer.fullName}
                  </p>

                  <p>
                    <strong>Email:</strong> {customer.email}
                  </p>

                  <p>
                    <strong>Phone:</strong> {customer.phone}
                  </p>

                  <p>
                    <strong>Address:</strong> {customer.address}
                  </p>

                  <p>
                    {customer.city}, {customer.province}
                  </p>
                </div>
              </div>

              {/* Payment */}

              <div>
                <div className="mb-3 flex items-center gap-2">
                  <CreditCard size={20} className="text-rose-600" />

                  <h3 className="font-semibold">Payment Method</h3>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  {paymentNames[paymentMethod]}
                </div>
              </div>

              {/* Products */}

              <div>
                <div className="mb-4 flex items-center gap-2">
                  <Package className="text-rose-600" size={20} />

                  <h3 className="font-semibold">Ordered Products</h3>
                </div>

                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 rounded-xl border p-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 rounded-lg object-cover"
                      />

                      <div className="flex-1">
                        <h4 className="font-semibold">{item.name}</h4>

                        <p className="text-sm text-gray-500">
                          Qty : {item.quantity}
                        </p>
                      </div>

                      <div className="font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}

              <div className="space-y-3 rounded-xl bg-gray-50 p-5">
                <div className="flex justify-between">
                  <span>Subtotal</span>

                  <span>${totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>

                  <span>{shipping === 0 ? "FREE" : `$${shipping}`}</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax</span>

                  <span>${tax.toFixed(2)}</span>
                </div>

                <hr />

                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>

                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Agreement */}

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="mt-1 accent-rose-600"
                />

                <span className="text-sm">
                  I confirm that my shipping information is correct and I agree
                  to the Terms & Conditions.
                </span>
              </label>
            </div>

            {/* Footer */}

            <div className="flex justify-end gap-4 border-t p-6">
              <button
                onClick={onClose}
                className="rounded-xl border px-6 py-3 font-semibold hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                disabled={!agree || loading}
                onClick={handleConfirm}
                className="rounded-xl bg-rose-600 px-8 py-3 font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Processing..." : "Confirm Order"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
