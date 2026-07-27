import features from "../../data/features";
import FeatureCard from "./FeatureCard";

export default function WhyChoose() {
  return (
    <section className="py-24 bg-rose-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <p className="uppercase tracking-[4px] text-rose-500">
            Why Choose Us
          </p>

          <h2 className="text-5xl font-bold mt-4">More Than Just Skincare</h2>

          <p className="max-w-3xl mx-auto mt-6 text-gray-500">
            Solis Skin combines trusted skincare brands, fast delivery and
            expert recommendations to help you build your perfect skincare
            routine.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {features.map((item) => (
            <FeatureCard key={item.id} feature={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
