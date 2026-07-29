import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import brands from "../../data/brands";

export default function TrustedBrands() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-white via-rose-50/40 to-white py-24">
      {/* Background */}

      <div className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-rose-200/20 blur-3xl"></div>

      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-pink-200/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-rose-100 px-5 py-2 text-sm font-semibold text-rose-600">
            Trusted Worldwide
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Brands We Trust
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-500">
            We partner with globally recognized skincare brands known for
            quality, innovation, and dermatologist-approved formulas.
          </p>
        </div>

        {/* Brands */}

        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
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
                duration: 0.5,
                delay: index * 0.08,
              }}
              whileHover={{
                y: -8,
              }}
            >
              <Link
                to={`/brand/${brand.slug}`}
                className="group flex h-56 flex-col items-center justify-center rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition hover:border-rose-100 hover:shadow-2xl"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-20 object-contain transition duration-300 group-hover:scale-110"
                />

                <h3 className="mt-8 text-center text-lg font-bold text-gray-900">
                  {brand.name}
                </h3>

                <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-rose-600">
                  Explore
                  <ArrowRight
                    size={16}
                    className="transition group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner */}

        <div className="mt-20 rounded-[40px] border border-rose-100 bg-white p-10 shadow-lg">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="text-center">
              <h2 className="text-5xl font-bold text-rose-600">40+</h2>

              <p className="mt-3 text-gray-500">International Brands</p>
            </div>

            <div className="text-center">
              <h2 className="text-5xl font-bold text-rose-600">500+</h2>

              <p className="mt-3 text-gray-500">Premium Products</p>
            </div>

            <div className="text-center">
              <h2 className="text-5xl font-bold text-rose-600">100%</h2>

              <p className="mt-3 text-gray-500">Authentic Guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
