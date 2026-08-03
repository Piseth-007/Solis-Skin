import { Star, Package } from "lucide-react";

export default function TopProducts({ products = [] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Top Products</h2>

        <p className="mt-1 text-sm text-slate-500">Best selling products</p>
      </div>

      {/* Empty State */}
      {products.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center text-slate-500">
          <Package size={42} className="mb-3 text-slate-300" />

          <p>No products available.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between rounded-xl border border-slate-100 p-3 transition hover:bg-slate-50"
            >
              {/* Product */}
              <div className="flex items-center gap-4">
                <img
                  src={
                    product.image || "https://placehold.co/64x64?text=No+Image"
                  }
                  alt={product.name}
                  className="h-14 w-14 rounded-xl border object-cover"
                />

                <div>
                  <h3 className="font-medium text-slate-900">{product.name}</h3>

                  <div className="mt-1 flex items-center gap-4 text-xs text-slate-500">
                    <span>
                      Stock: <strong>{product.stock}</strong>
                    </span>

                    <span>
                      Sold: <strong>{product.sold ?? 0}</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Price & Rating */}
              <div className="text-right">
                <p className="font-semibold text-pink-600">
                  ${Number(product.price).toFixed(2)}
                </p>

                <div className="mt-1 flex items-center justify-end gap-1 text-amber-500">
                  <Star size={14} fill="currentColor" />

                  <span className="text-xs text-slate-600">
                    {product.rating ?? 5.0}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
