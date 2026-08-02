import { Pencil, Trash2, Tag } from "lucide-react";

export default function BrandTable({ brands = [], onEdit, onDelete }) {
  const getStatusBadge = (active) => {
    if (active) {
      return (
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          Active
        </span>
      );
    }

    return (
      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
        Inactive
      </span>
    );
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr className="text-left text-sm font-semibold text-gray-600">
              <th className="px-6 py-4">#</th>
              <th className="px-6 py-4">Brand</th>
              <th className="px-6 py-4">Website</th>
              <th className="px-6 py-4">Products</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {brands.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-10 text-center text-gray-500">
                  No brands found.
                </td>
              </tr>
            ) : (
              brands.map((brand, index) => (
                <tr
                  key={brand.id}
                  className="border-t transition hover:bg-gray-50"
                >
                  {/* No */}
                  <td className="px-6 py-5 font-medium">{index + 1}</td>

                  {/* Brand */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-lg border bg-gray-100">
                        {brand.logoUrl ? (
                          <img
                            src={brand.logoUrl}
                            alt={brand.name}
                            className="h-full w-full object-contain p-1"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        ) : (
                          <Tag size={26} className="text-gray-400" />
                        )}
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {brand.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {brand.description || "No description"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Website */}
                  <td className="px-6 py-5">
                    {brand.website ? (
                      <a
                        href={brand.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Visit Website
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>

                  {/* Products */}
                  <td className="px-6 py-5">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      {brand.productCount ?? brand.products?.length ?? 0}{" "}
                      Products
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">{getStatusBadge(brand.active)}</td>

                  {/* Actions */}
                  <td className="px-6 py-5">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => onEdit(brand)}
                        className="rounded-lg border border-blue-200 p-2 text-blue-600 hover:bg-blue-50"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => onDelete(brand)}
                        className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
