import { AlertTriangle, X } from "lucide-react";

export default function DeleteDialog({
  open,
  onClose,
  onConfirm,
  loading = false,
  product,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-red-100 p-3">
              <AlertTriangle size={24} className="text-red-600" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-800">
                Delete Product
              </h2>

              <p className="text-sm text-gray-500">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          <p className="text-gray-600">
            Are you sure you want to delete this product?
          </p>

          {product && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4">
              <h3 className="font-semibold text-red-700">{product.name}</h3>

              <p className="mt-1 text-sm text-red-500">
                SKU: {product.sku || "N/A"}
              </p>

              <p className="mt-2 text-sm text-gray-600">
                Price: ${Number(product.price || 0).toFixed(2)}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t px-6 py-5">
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border border-gray-300 px-5 py-2.5 font-medium transition hover:bg-gray-100 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete Product"}
          </button>
        </div>
      </div>
    </div>
  );
}
