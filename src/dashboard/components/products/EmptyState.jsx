import { PackageSearch, Plus } from "lucide-react";

export default function EmptyState({
  title = "No Products Found",
  description = "You don't have any products yet. Create your first product to start selling.",
  buttonText = "Add Product",
  onAdd,
}) {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-8 py-20 shadow-sm">
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        {/* Icon */}
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-pink-100">
          <PackageSearch size={48} className="text-pink-600" />
        </div>

        {/* Title */}
        <h2 className="mt-6 text-2xl font-bold text-gray-800">{title}</h2>

        {/* Description */}
        <p className="mt-3 text-gray-500 leading-relaxed">{description}</p>

        {/* Button */}
        <button
          onClick={onAdd}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-pink-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-700"
        >
          <Plus size={18} />
          {buttonText}
        </button>
      </div>
    </div>
  );
}
