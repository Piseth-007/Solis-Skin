import { motion } from "framer-motion";
import categories from "../../data/categories";

export default function Categories() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">
          Shop by Category
        </h2>

        <p className="text-center text-gray-500 mb-14">
          Discover skincare essentials for your daily routine.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((item) => (
            <motion.div
              whileHover={{ y: -10 }}
              key={item.id}
              className="rounded-3xl overflow-hidden shadow-lg group cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-64 w-full object-cover group-hover:scale-110 transition duration-500"
              />

              <div className="bg-white py-6">
                <h3 className="text-xl font-semibold text-center">
                  {item.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
