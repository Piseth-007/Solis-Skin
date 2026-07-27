import skinConcerns from "../../data/skinConcerns";
import SkinConcernCard from "./SkinConcernCard";

export default function SkinConcern() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="uppercase tracking-[5px] text-rose-500">
            Find Your Routine
          </p>

          <h2 className="text-5xl font-bold mt-4">Shop by Skin Concern</h2>

          <p className="mt-5 text-gray-500 max-w-2xl mx-auto">
            Discover products specially selected to target your unique skincare
            concerns.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skinConcerns.map((item) => (
            <SkinConcernCard key={item.id} concern={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
