import CustomerRow from "./CustomerRow";

export default function CustomerTable({
  customers = [],
  loading = false,
  onView,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-12 shadow-sm">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-pink-500 border-t-transparent"></div>

          <p className="text-sm text-slate-500">Loading customers...</p>
        </div>
      </div>
    );
  }

  if (customers.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-16 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-pink-100">
          <span className="text-2xl">👤</span>
        </div>

        <h3 className="text-lg font-semibold text-slate-800">
          No Customers Found
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Try changing your search or add a new customer.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
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
            {customers.map((customer) => (
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
