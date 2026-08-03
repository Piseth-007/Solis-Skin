import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

import { getBrands } from "../../api/brandApi";

export default function TrustedBrands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      const data = await getBrands();
      setBrands(data.filter((brand) => brand.active));
    } catch (error) {
      console.error("Failed to load brands:", error);
    } finally {
      setLoading(false);
    }
  };

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
        {loading ? (
          <div className="mt-20 flex justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-rose-600" />
          </div>
        ) : (
          <div className="mt-20 flex flex-wrap justify-center gap-8">
            {brands.map((brand, index) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{ y: -8 }}
                className="w-full sm:w-70 lg:w-55"
              >
                <Link
                  to={`/brands/${brand.id}`}
                  className="group flex h-full flex-col rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:border-rose-100 hover:shadow-2xl"
                >
                  {/* Brand Logo */}
                  <div className="flex h-24 items-center justify-center">
                    <img
                      src={`http://localhost:8080${brand.logoUrl}`}
                      alt={brand.name}
                      className="max-h-20 object-contain transition duration-300 group-hover:scale-110"
                    />
                  </div>

                  {/* Brand Name */}
                  <h3 className="mt-8 text-center text-xl font-bold text-gray-900 group-hover:text-rose-600">
                    {brand.name}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 flex-1 text-center text-sm leading-6 text-gray-500">
                    {brand.description ||
                      "Premium skincare products trusted by professionals worldwide."}
                  </p>

                  {/* Button */}
                  <div className="mt-6 flex items-center justify-center gap-2 font-medium text-rose-600">
                    Explore
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Statistics */}
        <div className="mt-24 rounded-[40px] border border-rose-100 bg-white p-10 shadow-xl">
          <div className="grid gap-10 text-center md:grid-cols-3">
            <div>
              <h2 className="text-5xl font-bold text-rose-600">
                {brands.length}+
              </h2>
              <p className="mt-3 text-gray-500">Premium Brands</p>
            </div>

            <div>
              <h2 className="text-5xl font-bold text-rose-600">500+</h2>
              <p className="mt-3 text-gray-500">Premium Products</p>
            </div>

            <div>
              <h2 className="text-5xl font-bold text-rose-600">100%</h2>
              <p className="mt-3 text-gray-500">Authentic Guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
