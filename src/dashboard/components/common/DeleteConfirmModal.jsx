import { AlertTriangle } from "lucide-react";

export default function DeleteConfirmModal({
  open,
  title = "Delete",
  message = "Are you sure?",
  onCancel,
  onConfirm,
  loading = false,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex flex-col items-center border-b p-6">
          <div className="mb-4 rounded-full bg-red-100 p-4">
            <AlertTriangle className="text-red-600" size={36} />
          </div>

          <h2 className="text-xl font-bold">{title}</h2>

          <p className="mt-2 text-center text-gray-500">{message}</p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6">
          <button
            onClick={onCancel}
            className="rounded-lg border px-5 py-2 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
