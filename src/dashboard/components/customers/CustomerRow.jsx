import {
  Eye,
  Pencil,
  Trash2,
  Shield,
  User,
} from "lucide-react";

import StatusBadge from "../common/StatusBadge";

export default function CustomerRow({
  customer,
  onView,
  onEdit,
  onDelete,
}) {
  const initials = customer.fullName
    ? customer.fullName
        .split(" ")
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "NA";

  const joinedDate = customer.createdAt
    ? new Date(customer.createdAt).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-";

  return (
    <tr className="transition-colors hover:bg-slate-50">

      {/* Customer */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 text-sm font-bold text-pink-600">
            {initials}
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              {customer.fullName}
            </h3>

            <p className="text-sm text-slate-500">
              {customer.email}
            </p>
          </div>

        </div>
      </td>

      {/* Phone */}
      <td className="px-6 py-5">
        <span className="text-sm text-slate-700">
          {customer.phone || "-"}
        </span>
      </td>

      {/* Status */}
      <td className="px-6 py-5">
        <StatusBadge
          status={customer.active}
          variant="customer"
        />
      </td>

      {/* Role */}
      <td className="px-6 py-5">
        <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">

          {customer.role === "ROLE_ADMIN" ? (
            <>
              <Shield size={14} />
              Admin
            </>
          ) : (
            <>
              <User size={14} />
              Customer
            </>
          )}

        </span>
      </td>

      {/* Joined */}
      <td className="px-6 py-5">
        <span className="text-sm text-slate-600">
          {joinedDate}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-5">
        <div className="flex items-center justify-center gap-2">

          <button
            onClick={() => onView?.(customer)}
            className="rounded-xl bg-sky-100 p-2 text-sky-600 transition hover:bg-sky-200"
            title="View"
          >
            <Eye size={18} />
          </button>

          <button
            onClick={() => onEdit?.(customer)}
            className="rounded-xl bg-amber-100 p-2 text-amber-600 transition hover:bg-amber-200"
            title="Edit"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete?.(customer.id)}
            className="rounded-xl bg-red-100 p-2 text-red-600 transition hover:bg-red-200"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>

        </div>
      </td>

    </tr>
  );
}