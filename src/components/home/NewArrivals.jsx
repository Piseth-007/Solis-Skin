import ProductCard from "../common/ProductCard";
import newArrivals from "../../data/newArrivals";

export default function NewArrivals() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 flex items-center justify-between">
          <div>
            <p className="uppercase tracking-[4px] text-rose-500">
              Just Arrived
            </p>

            <h2 className="mt-3 text-5xl font-bold">New Arrivals</h2>
          </div>

          <button className="rounded-full border border-rose-600 px-6 py-3 text-rose-600 transition hover:bg-rose-600 hover:text-white">
            View All
          </button>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
