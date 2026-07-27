import { Heart, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

export default function FlashSaleCard({ product }) {
  const percent = (product.sold / product.stock) * 100;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-3xl overflow-hidden shadow-lg"
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-72 w-full object-cover"
        />

        <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          -{product.discount}%
        </span>

        <button className="absolute top-4 right-4 bg-white p-2 rounded-full">
          <Heart size={18} />
        </button>
      </div>

      <div className="p-6">
        <h3 className="font-semibold text-lg">{product.name}</h3>

        <div className="flex items-center gap-3 mt-3">
          <span className="text-2xl font-bold text-rose-600">
            ${product.price}
          </span>

          <span className="line-through text-gray-400">
            ${product.oldPrice}
          </span>
        </div>

        <div className="mt-5">
          <div className="flex justify-between text-sm">
            <span>Sold {product.sold}</span>
            <span>{product.stock} Stock</span>
          </div>

          <div className="h-2 rounded-full bg-gray-200 mt-2">
            <div
              style={{ width: `${percent}%` }}
              className="bg-rose-500 h-2 rounded-full"
            />
          </div>
        </div>

        <button className="mt-6 w-full bg-rose-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-rose-700">
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
