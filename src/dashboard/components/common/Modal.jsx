import { X } from "lucide-react";

export default function Modal({
  open,
  title,
  children,
  onClose,
  size = "max-w-2xl",
}) {
  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className={`w-full ${size} overflow-hidden rounded-3xl bg-white shadow-2xl`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
            <h2 className="text-xl font-bold text-slate-900">{title}</h2>

            <button
              onClick={onClose}
              className="rounded-xl p-2 transition hover:bg-slate-100"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="max-h-[70vh] overflow-y-auto p-6">{children}</div>
        </div>
      </div>
    </>
  );
}
