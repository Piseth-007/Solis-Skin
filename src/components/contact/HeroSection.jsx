import { motion } from "framer-motion";
import { PhoneCall } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-rose-50 via-white to-white">
      {/* Background */}

      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-rose-200/20 blur-3xl"></div>

      <div className="absolute -right-32 bottom-0 h-125 w-125 rounded-full bg-pink-200/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6 py-28 text-center">
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
          }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-5 py-2 text-sm font-semibold text-rose-600">
            <PhoneCall size={16} />
            Contact Solis Skin
          </span>

          <h1 className="mt-8 text-5xl font-bold text-gray-900 md:text-6xl">
            We'd Love
            <br />
            To Hear From You
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-600">
            Whether you have questions about products, orders, or skincare, our
            team is here to help. Reach out anytime—we're happy to assist.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
