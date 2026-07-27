import { Camera } from "lucide-react";
import { motion } from "framer-motion";

export default function InstagramCard({ image }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="group relative overflow-hidden rounded-[28px] cursor-pointer"
    >
      <img
        src={image}
        alt="Instagram Post"
        className="h-80 w-full object-cover duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/40" />

      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="rounded-full bg-white p-4 shadow-xl">
          <Camera className="text-rose-600" size={28} />
        </div>
      </div>
    </motion.div>
  );
}
