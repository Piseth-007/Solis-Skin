import { CreditCard, Landmark, Wallet } from "lucide-react";

export default function PaymentMethod({ paymentMethod, setPaymentMethod }) {
  const payments = [
    {
      id: "cod",
      name: "Cash on Delivery",
      icon: <Wallet size={22} />,
      description: "Pay when your order arrives.",
    },
    {
      id: "card",
      name: "Credit / Debit Card",
      icon: <CreditCard size={22} />,
      description: "Visa / MasterCard",
    },
    {
      id: "aba",
      name: "ABA Pay",
      icon: <Landmark size={22} />,
      description: "Pay using ABA Mobile",
    },
    {
      id: "acleda",
      name: "ACLEDA Bank",
      icon: <Landmark size={22} />,
      description: "Pay using ACLEDA Mobile",
    },
  ];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">Payment Method</h2>

      <div className="space-y-4">
        {payments.map((payment) => (
          <label
            key={payment.id}
            className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition ${
              paymentMethod === payment.id
                ? "border-rose-500 bg-rose-50"
                : "border-gray-200 hover:border-rose-300"
            }`}
          >
            <div className="flex items-center gap-4">
              {payment.icon}

              <div>
                <h3 className="font-semibold">{payment.name}</h3>

                <p className="text-sm text-gray-500">{payment.description}</p>
              </div>
            </div>

            <input
              type="radio"
              checked={paymentMethod === payment.id}
              onChange={() => setPaymentMethod(payment.id)}
            />
          </label>
        ))}
      </div>
    </div>
  );
}
