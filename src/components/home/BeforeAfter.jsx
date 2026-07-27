import { motion } from "framer-motion";
import ImageCompare from "./ImageCompare";
import { Sparkles, ShieldCheck, Heart } from "lucide-react";

export default function BeforeAfter() {
  return (
    <section className="bg-linear-to-b from-white to-rose-50 py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-5 py-2 text-sm font-semibold text-rose-600">
            <Sparkles size={18} />
            Real Results
          </span>

          <h2 className="mt-6 text-5xl lg:text-6xl font-bold">
            Before & After
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-500 leading-8">
            See how consistent skincare transforms skin texture, hydration, and
            overall appearance.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ImageCompare />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-8">
              <div className="flex gap-5">
                <div className="bg-rose-100 w-14 h-14 rounded-2xl flex items-center justify-center">
                  <Sparkles className="text-rose-600" />
                </div>

                <div>
                  <h3 className="font-bold text-2xl">Brighter Skin</h3>

                  <p className="text-gray-500 mt-2 leading-7">
                    Improve dull skin and reveal a healthier glow.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="bg-emerald-100 w-14 h-14 rounded-2xl flex items-center justify-center">
                  <ShieldCheck className="text-emerald-600" />
                </div>

                <div>
                  <h3 className="font-bold text-2xl">Stronger Skin Barrier</h3>

                  <p className="text-gray-500 mt-2 leading-7">
                    Hydration and barrier repair with dermatologist-recommended
                    products.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="bg-pink-100 w-14 h-14 rounded-2xl flex items-center justify-center">
                  <Heart className="text-pink-600" />
                </div>

                <div>
                  <h3 className="font-bold text-2xl">Confidence Every Day</h3>

                  <p className="text-gray-500 mt-2 leading-7">
                    Healthy skin means feeling comfortable and confident in your
                    daily routine.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-16">
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-5xl font-bold text-rose-600">95%</h3>

                <p className="mt-3 text-gray-500">Customer Satisfaction</p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-5xl font-bold text-rose-600">18K+</h3>

                <p className="mt-3 text-gray-500">Happy Customers</p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-5xl font-bold text-rose-600">4.9★</h3>

                <p className="mt-3 text-gray-500">Average Rating</p>
              </div>
            </div>

            <button className="mt-12 rounded-full bg-rose-600 px-10 py-5 text-white font-semibold hover:bg-rose-700 transition-all duration-300 hover:scale-105 shadow-xl">
              Shop Skincare Routine
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
