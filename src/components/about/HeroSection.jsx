import { motion } from "framer-motion";
import { ArrowRight, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

import heroImage from "../../assets/about/about-hero.png";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-rose-50 via-white to-white">
      {/* Background */}

      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-rose-200/20 blur-3xl"></div>

      <div className="absolute -right-32 bottom-0 h-125 w-125 rounded-full bg-pink-200/20 blur-3xl"></div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2">
        {/* Left */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-5 py-2 text-sm font-semibold text-rose-600">
            <Leaf size={16} />
            About Solis Skin
          </span>

          <h1 className="mt-8 text-5xl font-bold leading-tight text-gray-900 md:text-6xl">
            Healthy Skin Begins
            <br />
            With Confidence
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-gray-600">
            At <span className="font-semibold text-rose-600">Solis Skin</span>,
            we believe skincare should be simple, effective, and accessible. Our
            mission is to bring authentic skincare products from the world's
            most trusted brands directly to your daily routine.
          </p>

          <div className="mt-10 flex flex-wrap gap-5">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-8 py-4 font-semibold text-white transition hover:bg-rose-700"
            >
              Shop Now
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/contact"
              className="rounded-full border border-gray-300 px-8 py-4 font-semibold transition hover:border-rose-500 hover:text-rose-600"
            >
              Contact Us
            </Link>
          </div>

          {/* Stats */}

          <div className="mt-14 grid grid-cols-3 gap-8">
            <div>
              <h3 className="text-3xl font-bold text-rose-600">20K+</h3>
              <p className="mt-2 text-gray-500">Happy Customers</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-rose-600">500+</h3>
              <p className="mt-2 text-gray-500">Premium Products</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-rose-600">40+</h3>
              <p className="mt-2 text-gray-500">Trusted Brands</p>
            </div>
          </div>
        </motion.div>

        {/* Right */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-rose-200/30 blur-3xl"></div>

          <div className="absolute -right-10 bottom-10 h-52 w-52 rounded-full bg-pink-200/30 blur-3xl"></div>

          <img
            src={heroImage}
            alt="About Solis Skin"
            className="relative rounded-[40px] shadow-2xl"
          />

          {/* Floating Card */}

          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
            }}
            className="absolute -bottom-8 left-8 rounded-3xl bg-white p-6 shadow-xl"
          >
            <p className="text-sm text-gray-500">Trusted Rating</p>

            <h3 className="mt-2 text-3xl font-bold text-yellow-500">★ 4.9/5</h3>

            <p className="mt-1 text-gray-500">Based on 12,000+ reviews</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
