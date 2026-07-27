import brands from "../../data/brands";
import BrandCard from "./BrandCard";

export default function BrandSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <p className="uppercase tracking-[4px] text-rose-500 font-semibold">
            Trusted Brands
          </p>

          <h2 className="text-5xl font-bold mt-4">Shop Your Favorite Brands</h2>

          <p className="mt-6 text-gray-500 max-w-3xl mx-auto leading-8">
            We partner with internationally recognized skincare brands to bring
            you authentic products for every skin type.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-16">
          {brands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
}
