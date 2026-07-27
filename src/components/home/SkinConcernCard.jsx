import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function SkinConcernCard({ concern }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="relative rounded-3xl overflow-hidden group h-107.5  cursor-pointer"
    >
      <img
        src={concern.image}
        alt={concern.title}
        className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110"
      />

      <div
        className={`absolute inset-0 bg-linear-to-t ${concern.color} opacity-70`}
      />

      <div className="absolute bottom-0 p-8 text-white">
        <h3 className="text-3xl font-bold">{concern.title}</h3>

        <p className="mt-3 leading-7 opacity-90">{concern.description}</p>

        <button className="mt-6 flex items-center gap-2 font-semibold">
          Shop Now
          <ArrowRight
            size={18}
            className="group-hover:translate-x-2 transition"
          />
        </button>
      </div>
    </motion.div>
  );
}
