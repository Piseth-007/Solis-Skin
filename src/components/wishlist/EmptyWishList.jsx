import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function EmptyWishlist() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 180,
        }}
        className="mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-rose-100"
      >
        <Heart size={60} className="fill-rose-500 text-rose-500" />
      </motion.div>

      <h2 className="text-3xl font-bold text-gray-900">
        Your Wishlist is Empty
      </h2>

      <p className="mt-3 max-w-md text-gray-500">
        Save your favorite skincare products so you can find them quickly later.
      </p>

      <Link
        to="/shop"
        className="mt-8 rounded-full bg-rose-600 px-8 py-3 font-semibold text-white transition hover:bg-rose-700"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
