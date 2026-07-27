import ProductCard from "../common/ProductCard";

export default function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center rounded-3xl border border-dashed">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">No products found</h2>

          <p className="mt-2 text-gray-500">
            Try another keyword or adjust your filters.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
