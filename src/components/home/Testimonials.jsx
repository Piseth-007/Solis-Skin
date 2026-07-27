import testimonials from "../../data/testimonials";
import TestimonialCard from "./TestimonialCard";

export default function Testimonials() {
  return (
    <section className="bg-linear-to-b from-white to-rose-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="uppercase tracking-[4px] text-rose-500">
            Customer Reviews
          </p>

          <h2 className="mt-3 text-5xl font-bold">Loved by Thousands</h2>

          <p className="mt-6 text-gray-500 max-w-2xl mx-auto">
            Real reviews from customers who trust Solis Skin for their daily
            skincare routine.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <TestimonialCard key={item.id} testimonial={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
