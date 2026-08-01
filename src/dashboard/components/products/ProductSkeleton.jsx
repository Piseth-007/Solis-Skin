export default function ProductSkeleton({ rows = 8 }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Table Header */}
      <div className="grid grid-cols-8 gap-4 border-b bg-gray-50 px-6 py-4">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="h-4 animate-pulse rounded bg-gray-200" />
        ))}
      </div>

      {/* Table Body */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="grid grid-cols-8 items-center gap-4 border-b px-6 py-5"
        >
          {/* Checkbox */}
          <div className="flex justify-center">
            <div className="h-5 w-5 animate-pulse rounded bg-gray-200" />
          </div>

          {/* Product */}
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 animate-pulse rounded-lg bg-gray-200" />

            <div className="space-y-2">
              <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-24 animate-pulse rounded bg-gray-100" />
            </div>
          </div>

          {/* Category */}
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />

          {/* Brand */}
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />

          {/* Price */}
          <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />

          {/* Stock */}
          <div className="space-y-2">
            <div className="h-4 w-10 animate-pulse rounded bg-gray-200" />
            <div className="h-6 w-24 animate-pulse rounded-full bg-gray-100" />
          </div>

          {/* Status */}
          <div className="h-6 w-20 animate-pulse rounded-full bg-gray-100" />

          {/* Actions */}
          <div className="flex gap-2">
            <div className="h-9 w-9 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-9 w-9 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-9 w-9 animate-pulse rounded-lg bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
