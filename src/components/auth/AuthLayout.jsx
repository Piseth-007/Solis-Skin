import { motion } from "framer-motion";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <section className="min-h-screen bg-linear-to-br from-rose-50 via-white to-pink-50">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-10">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">
          {/* Left Side */}
          <div className="hidden bg-linear-to-br from-rose-600 to-pink-600 p-12 text-white lg:flex lg:flex-col lg:justify-center">
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl font-extrabold"
            >
              SOLIS SKIN
            </motion.h1>

            <p className="mt-6 text-lg leading-8 text-rose-100">
              Discover premium skincare products that help your skin stay
              healthy, radiant, and naturally beautiful.
            </p>

            <div className="mt-10 space-y-4 text-rose-100">
              <p>✔ Premium skincare products</p>
              <p>✔ Secure online shopping</p>
              <p>✔ Fast nationwide delivery</p>
              <p>✔ Trusted by thousands of customers</p>
            </div>
          </div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center p-8 md:p-12"
          >
            <div className="w-full max-w-md">
              <h2 className="text-4xl font-bold text-gray-900">{title}</h2>

              <p className="mt-3 text-gray-500">{subtitle}</p>

              <div className="mt-8">{children}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
