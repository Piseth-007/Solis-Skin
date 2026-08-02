const STATUS_STYLES = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PAID: "bg-green-100 text-green-800",
  FAILED: "bg-red-100 text-red-800",
  REFUNDED: "bg-gray-100 text-gray-800",
};

const STATUS_LABELS = {
  PENDING: "Pending",
  PAID: "Paid",
  FAILED: "Failed",
  REFUNDED: "Refunded",
};

export default function PaymentStatusBadge({ status }) {
  const badgeClass =
    STATUS_STYLES[status] || "bg-gray-100 text-gray-800";

  const label = STATUS_LABELS[status] || status;

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}
    >
      {label}
    </span>
  );
}