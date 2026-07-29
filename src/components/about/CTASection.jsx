import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background */}

      <div className="absolute inset-0 bg-linear-to-r from-rose-600 via-pink-500 to-rose-600"></div>

      <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>

      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>

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
        className="relative mx-auto max-w-5xl px-6 text-center text-white"
      >
        <span className="inline-flex rounded-full bg-white/20 px-5 py-2 text-sm font-semibold backdrop-blur">
          Start Your Skincare Journey
        </span>

        <h2 className="mt-8 text-5xl font-bold leading-tight md:text-6xl">
          Ready to Transform
          <br />
          Your Skin?
        </h2>

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-rose-100">
          Discover premium skincare products from trusted international brands.
          Build a routine that fits your skin type and achieve healthy,
          radiant-looking skin with confidence.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-5">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-rose-600 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <ShoppingBag size={20} />
            Shop Now
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-rose-600"
          >
            Contact Us
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Stats */}

        <div className="mt-20 grid gap-8 border-t border-white/20 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-4xl font-bold">20K+</h3>
            <p className="mt-2 text-rose-100">Happy Customers</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">500+</h3>
            <p className="mt-2 text-rose-100">Premium Products</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">40+</h3>
            <p className="mt-2 text-rose-100">Global Brands</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">4.9★</h3>
            <p className="mt-2 text-rose-100">Customer Rating</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
