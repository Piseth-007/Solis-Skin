import { Users, Loader2 } from "lucide-react";
import CustomerRow from "./CustomerRow";

export default function CustomerTable({
  customers = [],
  loading = false,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="max-w-full overflow-x-auto">
        <table className="min-w-full">
          {/* Header */}
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Customer
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Phone
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Status
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Role
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Joined
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {/* Loading */}
            {loading && (
              <tr>
                <td colSpan={6} className="py-16">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <Loader2 className="h-10 w-10 animate-spin text-pink-500" />

                    <p className="text-sm text-slate-500">
                      Loading customers...
                    </p>
                  </div>
                </td>
              </tr>
            )}

            {/* Empty */}
            {!loading && customers.length === 0 && (
              <tr>
                <td colSpan={6} className="py-16">
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-pink-100">
                      <Users className="h-8 w-8 text-pink-600" />
                    </div>

                    <h3 className="text-lg font-semibold text-slate-800">
                      No Customers Found
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      No customers match your current search or filter.
                    </p>
                  </div>
                </td>
              </tr>
            )}

            {/* Data */}
            {!loading &&
              customers.map((customer) => (
                <CustomerRow
                  key={customer.id}
                  customer={customer}
                  onView={onView}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
