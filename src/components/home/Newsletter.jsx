import { Mail, Gift, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Newsletter() {
  return (
    <section className="py-28 bg-linear-to-r from-rose-500 via-pink-500 to-rose-600">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[40px] bg-white p-12 lg:p-20 shadow-2xl"
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-2 text-rose-600 font-semibold">
                <Sparkles size={18} />
                Exclusive Offer
              </div>

              <h2 className="mt-6 text-5xl font-bold leading-tight">
                Join 35,000+ Beauty Lovers
              </h2>

              <p className="mt-6 text-lg text-gray-500 leading-8">
                Subscribe to receive skincare tips, exclusive offers, new
                arrivals, and enjoy
                <span className="font-semibold text-rose-600"> 10% OFF </span>
                your first order.
              </p>

              <div className="mt-10 flex items-center gap-4 text-gray-600">
                <Gift className="text-rose-500" />
                First Order Discount
              </div>
            </div>

            <form className="space-y-6">
              <div className="relative">
                <Mail
                  size={22}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full rounded-full border border-gray-200 py-5 pl-14 pr-6 outline-none focus:border-rose-500"
                />
              </div>

              <button className="w-full rounded-full bg-rose-600 py-5 text-lg font-semibold text-white transition hover:bg-rose-700">
                Subscribe Now
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
