import { Star, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function TestimonialCard({ testimonial }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="rounded-3xl bg-white p-8 shadow-lg hover:shadow-xl transition"
    >
      <div className="flex items-center gap-4">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="h-16 w-16 rounded-full object-cover"
        />

        <div>
          <h3 className="font-semibold text-lg">{testimonial.name}</h3>

          <div className="flex items-center gap-1 text-emerald-600 text-sm">
            <BadgeCheck size={16} />
            {testimonial.role}
          </div>
        </div>
      </div>

      <div className="mt-6 flex">
        {[...Array(testimonial.rating)].map((_, index) => (
          <Star
            key={index}
            size={18}
            className="fill-yellow-400 text-yellow-400"
          />
        ))}
      </div>

      <p className="mt-6 text-gray-600 leading-8 italic">
        "{testimonial.review}"
      </p>
    </motion.div>
  );
}
