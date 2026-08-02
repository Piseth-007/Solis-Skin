export default function StatusBadge({ status, variant = "default" }) {
  const styles = {
    active: "bg-green-100 text-green-700",
    inactive: "bg-red-100 text-red-700",

    pending: "bg-yellow-100 text-yellow-700",
    processing: "bg-blue-100 text-blue-700",
    shipped: "bg-indigo-100 text-indigo-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",

    stock: "bg-green-100 text-green-700",
    out: "bg-red-100 text-red-700",

    default: "bg-slate-100 text-slate-700",
  };

  let key = "default";

  if (variant === "customer") {
    key = status ? "active" : "inactive";
  }

  if (variant === "product") {
    key = status ? "stock" : "out";
  }

  if (variant === "order") {
    key = String(status).toLowerCase();
  }

  const labels = {
    active: "Active",
    inactive: "Inactive",

    stock: "In Stock",
    out: "Out of Stock",

    pending: "Pending",
    processing: "Processing",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${styles[key]}`}
    >
      <span className="h-2 w-2 rounded-full bg-current opacity-80"></span>

      {labels[key] ?? status}
    </span>
  );
}
