import { motion } from "framer-motion";

export default function FeatureCard({ feature }) {
  const Icon = feature.icon;

  return (
    <motion.div
      whileHover={{
        y: -10,
      }}
      className="bg-white rounded-3xl shadow-lg p-8 transition duration-300"
    >
      <div className="w-16 h-16 rounded-2xl bg-rose-100 flex items-center justify-center">
        <Icon size={34} className="text-rose-600" />
      </div>

      <h3 className="text-2xl font-semibold mt-6">{feature.title}</h3>

      <p className="text-gray-500 mt-4 leading-7">{feature.description}</p>
    </motion.div>
  );
}
