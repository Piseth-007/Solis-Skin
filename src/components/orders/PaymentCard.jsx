import { CreditCard, CircleCheck, Clock } from "lucide-react";

export default function PaymentCard({ order }) {
  if (!order) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <p className="text-center text-gray-500">
          No payment information available.
        </p>
      </div>
    );
  }

  const isPaid = order.paymentStatus === "Paid";

  const paymentMethodLabels = {
    cod: "Cash on Delivery",
    card: "Credit Card",
    visa: "Visa",
    mastercard: "MasterCard",
    aba: "ABA Pay",
    acleda: "ACLEDA",
    bakong: "Bakong QR",
  };

  const paymentLabel =
    paymentMethodLabels[order.paymentMethod] || order.paymentMethod;

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <CreditCard className="text-rose-500" />

        <h2 className="text-xl font-bold">Payment Information</h2>
      </div>

      <div className="space-y-5">
        {/* Payment Method */}
        <div>
          <p className="text-sm text-gray-500">Payment Method</p>

          <p className="mt-1 font-semibold">{paymentLabel}</p>
        </div>

        {/* Payment Status */}
        <div>
          <p className="text-sm text-gray-500">Payment Status</p>

          <div
            className={`mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${
              isPaid
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {isPaid ? (
              <>
                <CircleCheck size={16} />
                Paid
              </>
            ) : (
              <>
                <Clock size={16} />
                Pending
              </>
            )}
          </div>
        </div>

        {/* Order Status */}
        <div>
          <p className="text-sm text-gray-500">Order Status</p>

          <p className="mt-1 font-semibold">{order.status}</p>
        </div>
      </div>
    </div>
  );
}
