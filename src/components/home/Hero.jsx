import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Truck, Sparkles, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-rose-50 via-pink-50 to-white">
      {/* Background Decoration */}

      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-rose-200/30 blur-3xl"></div>

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-pink-200/30 blur-3xl"></div>

      <div className="absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-100/40 blur-3xl"></div>

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2">
        {/* Left Side */}

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}

          <div className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 shadow-lg">
            <Sparkles size={16} className="text-rose-500" />

            <span className="text-sm font-medium text-gray-700">
              New Collection 2026
            </span>
          </div>

          {/* Heading */}

          <h1 className="mt-8 text-5xl font-extrabold leading-tight text-gray-900 lg:text-7xl">
            Healthy Skin
            <br />
            Starts With
            <br />
            <span className="bg-linear-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
              Solis Skin
            </span>
          </h1>

          {/* Description */}

          <p className="mt-8 max-w-xl text-lg leading-8 text-gray-600">
            Discover premium skincare products from trusted global brands. Build
            your perfect skincare routine with dermatologist-inspired products
            for healthy, glowing skin.
          </p>

          {/* Rating */}

          <div className="mt-8 flex items-center gap-5">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, index) => (
                <Star key={index} size={20} fill="currentColor" />
              ))}
            </div>

            <div>
              <p className="font-semibold text-gray-900">
                4.9 / 5 Customer Rating
              </p>

              <p className="text-sm text-gray-500">
                Trusted by 25,000+ skincare lovers
              </p>
            </div>
          </div>

          {/* Buttons */}

          <div className="mt-10 flex flex-wrap gap-5">
            <Link
              to="/shop"
              className="flex items-center gap-2 rounded-full bg-rose-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-rose-700 hover:shadow-xl"
            >
              Shop Now
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/categories"
              className="rounded-full border border-gray-300 bg-white px-8 py-4 font-semibold transition-all duration-300 hover:border-rose-600 hover:text-rose-600 hover:shadow-lg"
            >
              Explore Categories
            </Link>
          </div>

          {/* Stats */}

          <div className="mt-14 grid grid-cols-3 gap-8">
            <div>
              <h3 className="text-3xl font-bold text-rose-600">50+</h3>

              <p className="mt-1 text-gray-500">Premium Products</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-rose-600">6+</h3>

              <p className="mt-1 text-gray-500">Global Brands</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-rose-600">25K+</h3>

              <p className="mt-1 text-gray-500">Happy Customers</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side */}

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Floating Card */}

          <div className="absolute -left-6 top-12 z-10 rounded-3xl bg-white p-5 shadow-2xl">
            <div className="flex items-center gap-3">
              <ShieldCheck size={28} className="text-green-500" />

              <div>
                <p className="font-semibold">100% Authentic</p>

                <p className="text-sm text-gray-500">Genuine skincare</p>
              </div>
            </div>
          </div>

          {/* Floating Card */}

          <div className="absolute -right-6 bottom-12 z-10 rounded-3xl bg-white p-5 shadow-2xl">
            <div className="flex items-center gap-3">
              <Truck size={28} className="text-blue-500" />

              <div>
                <p className="font-semibold">Free Shipping</p>

                <p className="text-sm text-gray-500">Orders over $50</p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[40px] bg-linear-to-br from-rose-100 to-pink-100 p-6 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900"
              alt="Solis Skin"
              className="h-150 w-full rounded-3xl object-cover transition duration-500 hover:scale-105"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
