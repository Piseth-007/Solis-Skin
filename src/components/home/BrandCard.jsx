import { motion } from "framer-motion";

export default function BrandCard({ brand }) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.03,
      }}
      transition={{ duration: 0.25 }}
      className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl p-8 flex items-center justify-center h-40 group"
    >
      <img
        src={brand.logo}
        alt={brand.name}
        className="max-h-14 object-contain grayscale group-hover:grayscale-0 transition duration-500"
      />
    </motion.div>
  );
}
