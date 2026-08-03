const filters = [
  { label: "All", value: "All" },
  { label: "Pending", value: "PENDING" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Packing", value: "PACKING" },
  { label: "Shipping", value: "SHIPPING" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Cancelled", value: "CANCELLED" },
];

export default function OrderFilter({ filter, setFilter }) {
  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((item) => (
        <button
          key={item.value}
          onClick={() => setFilter(item.value)}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
            filter === item.value
              ? "bg-rose-600 text-white shadow-md"
              : "border border-gray-200 bg-white text-gray-600 hover:border-rose-300 hover:text-rose-600"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
