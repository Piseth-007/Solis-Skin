import { useState } from "react";
import { updateOrderStatus, updatePaymentStatus } from "../../../api/orderApi";
import OrderStatusBadge from "./OrderStatusBadge";
import PaymentStatusBadge from "./PaymentStatusBadge";

const ORDER_STATUS_OPTIONS = [
  "PENDING",
  "CONFIRMED",
  "PACKING",
  "SHIPPING",
  "DELIVERED",
  "CANCELLED",
];

const PAYMENT_STATUS_OPTIONS = ["PENDING", "PAID", "FAILED", "REFUNDED"];

export default function OrderModal({ order, mode, onClose, onSaved }) {
  const [status, setStatus] = useState(order.status);
  const [paymentStatus, setPaymentStatus] = useState(order.paymentStatus);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const isEdit = mode === "edit";

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const promises = [];
      if (status !== order.status) {
        promises.push(updateOrderStatus(order.id, status));
      }
      if (paymentStatus !== order.paymentStatus) {
        promises.push(updatePaymentStatus(order.id, paymentStatus));
      }
      await Promise.all(promises);
      await onSaved();
      onClose();
    } catch (err) {
      console.error("Failed to update order:", err);
      setError("Failed to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-lg font-bold">
              {isEdit ? "Update Order" : "Order Details"}
            </h2>
            <p className="text-sm text-gray-500">{order.orderNumber}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            &times;
          </button>
        </div>

        <div className="px-6 py-4 space-y-6">
          {/* Summary */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Order Date</p>
              <p className="font-medium">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Total</p>
              <p className="font-medium">
                ${Number(order.totalAmount).toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Payment Method</p>
              <p className="font-medium">{order.paymentMethod}</p>
            </div>
            <div>
              <p className="text-gray-500">Shipping Address</p>
              <p className="font-medium">{order.shippingAddress || "-"}</p>
            </div>
          </div>

          {/* Status section */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Order Status
              </label>
              {isEdit ? (
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full rounded border px-3 py-2 text-sm"
                >
                  {ORDER_STATUS_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <OrderStatusBadge status={order.status} />
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Payment Status
              </label>
              {isEdit ? (
                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  className="w-full rounded border px-3 py-2 text-sm"
                >
                  {PAYMENT_STATUS_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <PaymentStatusBadge status={order.paymentStatus} />
              )}
            </div>
          </div>

          {/* Note */}
          {order.note && (
            <div>
              <p className="text-sm text-gray-500 mb-1">Note</p>
              <p className="text-sm">{order.note}</p>
            </div>
          )}

          {/* Items */}
          <div>
            <p className="text-sm text-gray-500 mb-2">Items</p>
            <div className="divide-y rounded border">
              {order.items?.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 px-3 py-2 text-sm"
                >
                  {item.productImage && (
                    <img
                      src={`http://localhost:8080${item.productImage}`}
                      alt={item.productName}
                      className="h-10 w-10 rounded object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-gray-500">
                      {item.quantity} × ${Number(item.price).toFixed(2)}
                    </p>
                  </div>
                  <p className="font-medium">
                    ${Number(item.subtotal).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded px-3 py-2">
              {error}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-2 border-t px-6 py-4">
          <button
            onClick={onClose}
            disabled={saving}
            className="rounded px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50"
          >
            {isEdit ? "Cancel" : "Close"}
          </button>
          {isEdit && (
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
