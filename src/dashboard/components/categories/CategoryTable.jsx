import { FolderOpen, Pencil, Trash2, Package } from "lucide-react";

export default function CategoryTable({ categories = [], onEdit, onDelete }) {
  if (categories.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-pink-100">
          <FolderOpen className="text-pink-600" size={30} />
        </div>

        <h3 className="text-lg font-semibold text-slate-800">
          No Categories Found
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Create your first category to organize your products.
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
                #
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Category
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Description
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Products
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {categories.map((category, index) => (
              <tr
                key={category.id}
                className="transition-colors hover:bg-slate-50"
              >
                {/* Number */}
                <td className="px-6 py-5 font-semibold text-slate-600">
                  {index + 1}
                </td>

                {/* Category */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-100">
                      <FolderOpen className="text-pink-600" size={22} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {category.name}
                      </h3>

                      <p className="text-xs text-slate-500">
                        Category #{category.id}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Description */}
                <td className="max-w-sm px-6 py-5">
                  <p className="line-clamp-2 text-sm text-slate-600">
                    {category.description || "No description available"}
                  </p>
                </td>

                {/* Product Count */}
                <td className="px-6 py-5">
                  <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    <Package size={14} />

                    {category.productCount ?? category.products?.length ?? 0}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-5">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(category)}
                      className="rounded-xl bg-amber-100 p-2 text-amber-600 transition hover:bg-amber-200"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => onDelete(category)}
                      className="rounded-xl bg-red-100 p-2 text-red-600 transition hover:bg-red-200"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
