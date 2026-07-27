import { Heart, ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";
import products from "../../data/products";

export default function BestSeller() {
  return (
    <section className="bg-rose-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-14">Best Sellers</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <motion.div
              whileHover={{ y: -8 }}
              key={product.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-72 w-full object-cover"
                />

                <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow">
                  <Heart size={18} />
                </button>
              </div>

              <div className="p-6">
                <div className="flex mb-3">
                  {[...Array(product.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <h3 className="font-semibold text-xl">{product.name}</h3>

                <p className="text-rose-600 text-2xl font-bold mt-3">
                  ${product.price}
                </p>

                <button className="mt-6 w-full bg-rose-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-rose-700 transition">
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
