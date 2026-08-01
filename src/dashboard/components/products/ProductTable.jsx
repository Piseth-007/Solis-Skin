import { Eye, Pencil, Trash2, Package } from "lucide-react";

export default function ProductTable({ products = [], onEdit, onDelete }) {
  const getStockBadge = (stock) => {
    if (stock === 0) {
      return (
        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
          Out of Stock
        </span>
      );
    }

    if (stock <= 10) {
      return (
        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
          Low Stock
        </span>
      );
    }

    return (
      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
        In Stock
      </span>
    );
  };

  const getStatusBadge = (status) => {
    switch ((status || "ACTIVE").toLowerCase()) {
      case "inactive":
        return (
          <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-700">
            Inactive
          </span>
        );

      case "draft":
        return (
          <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
            Draft
          </span>
        );

      default:
        return (
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            Active
          </span>
        );
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr className="text-left text-sm font-semibold text-gray-600">
              <th className="px-6 py-4">
                <input type="checkbox" />
              </th>

              <th className="px-6 py-4">Product</th>

              <th className="px-6 py-4">Category</th>

              <th className="px-6 py-4">Brand</th>

              <th className="px-6 py-4">Price</th>

              <th className="px-6 py-4">Stock</th>

              <th className="px-6 py-4">Status</th>

              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-10 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product.id}
                  className="border-t transition hover:bg-gray-50"
                >
                  <td className="px-6 py-5">
                    <input type="checkbox" />
                  </td>

                  {/* Product */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg border bg-gray-100">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        ) : (
                          <Package size={28} className="text-gray-400" />
                        )}
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {product.name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          SKU : {product.sku || "N/A"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-5">{product.category?.name || "-"}</td>

                  {/* Brand */}
                  <td className="px-6 py-5">{product.brand?.name || "-"}</td>

                  {/* Price */}
                  <td className="px-6 py-5 font-semibold text-pink-600">
                    $
                    {Number(product.price ?? 0).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>

                  {/* Stock */}
                  <td className="px-6 py-5">
                    <div className="space-y-1">
                      <div className="font-semibold">{product.stock}</div>

                      {getStockBadge(product.stock)}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    {getStatusBadge(product.status)}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => console.log(product)}
                        className="rounded-lg border p-2 hover:bg-gray-100"
                        title="View"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => onEdit(product)}
                        className="rounded-lg border border-blue-200 p-2 text-blue-600 hover:bg-blue-50"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => onDelete(product)}
                        className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50"
                        title="Delete"
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
