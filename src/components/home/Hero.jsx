import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="bg-linear-to-r from-rose-50 to-pink-100">

      <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
        >

          <span className="bg-rose-200 px-4 py-2 rounded-full text-sm">
            New Collection 2026
          </span>

          <h1 className="text-6xl font-bold mt-6 leading-tight">
            Healthy Skin
            <br />
            Starts With
            <span className="text-rose-600">
              {" "}
              Solis Skin
            </span>
          </h1>

          <p className="text-gray-600 mt-8 text-lg leading-8">
            Discover premium skincare products carefully selected
            for every skin type. Feel confident with glowing,
            healthy skin every day.
          </p>

          <div className="mt-10 flex gap-5">

            <button className="bg-rose-600 text-white px-8 py-4 rounded-full hover:bg-rose-700 transition">
              Shop Now
            </button>

            <button className="border border-rose-600 text-rose-600 px-8 py-4 rounded-full">
              Explore
            </button>

          </div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
        >

          <img
            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"
            alt=""
            className="rounded-4xl shadow-2xl"
          />

        </motion.div>

      </div>

    </section>
  );
}