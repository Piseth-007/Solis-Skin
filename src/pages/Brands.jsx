import brands from "../data/brands";
import BrandCard from "../components/brand/BrandCard";

export default function Brands() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-linear-to-r from-rose-500 to-pink-500 text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h1 className="text-5xl font-bold">
            Discover Our Brands
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-rose-100">
            Shop premium skincare from trusted international brands,
            carefully selected for every skin type.
          </p>
        </div>
      </section>

      {/* Brand Grid */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10">
          <h2 className="text-3xl font-bold">
            Featured Brands
          </h2>

          <p className="mt-2 text-gray-500">
            {brands.length} skincare brands available.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand) => (
            <BrandCard
              key={brand.id}
              brand={brand}
            />
          ))}
        </div>
      </section>
    </main>
  );
}