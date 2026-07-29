import { motion } from "framer-motion";
import { BadgeCheck, Truck, ShieldCheck, Headset } from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    title: "100% Authentic Products",
    description:
      "Every product is sourced directly from trusted brands and authorized distributors to guarantee authenticity.",
  },
  {
    icon: Truck,
    title: "Fast Nationwide Delivery",
    description:
      "We deliver quickly and securely across Cambodia with reliable shipping partners and order tracking.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Shopping",
    description:
      "Your personal information and payments are protected with secure checkout and trusted payment methods.",
  },
  {
    icon: Headset,
    title: "Expert Customer Support",
    description:
      "Our friendly skincare team is always ready to help you choose products that fit your skin concerns.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-rose-100 px-5 py-2 text-sm font-semibold text-rose-600">
            Why Choose Us
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900 md:text-5xl">
            More Than Just Skincare
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-500">
            We don't just sell skincare—we help you build confidence through
            trusted products, expert guidance, and a seamless shopping
            experience.
          </p>
        </div>

        {/* Cards */}

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
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
                  delay: index * 0.15,
                }}
                whileHover={{
                  y: -10,
                }}
                className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition hover:border-rose-100 hover:shadow-2xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 transition group-hover:bg-rose-600 group-hover:text-white">
                  <Icon size={30} />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-5 leading-7 text-gray-500">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner */}

        <div className="mt-20 rounded-[40px] bg-linear-to-r from-rose-600 via-pink-500 to-rose-600 px-10 py-14 text-white shadow-2xl">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h3 className="text-4xl font-bold">
                Trusted by Thousands of Customers
              </h3>

              <p className="mt-5 text-lg leading-8 text-rose-100">
                From everyday essentials to premium skincare collections, Solis
                Skin has become a trusted destination for beauty lovers across
                Cambodia.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 text-center">
              <div>
                <h2 className="text-5xl font-bold">20K+</h2>
                <p className="mt-2 text-rose-100">Happy Customers</p>
              </div>

              <div>
                <h2 className="text-5xl font-bold">500+</h2>
                <p className="mt-2 text-rose-100">Products</p>
              </div>

              <div>
                <h2 className="text-5xl font-bold">40+</h2>
                <p className="mt-2 text-rose-100">Trusted Brands</p>
              </div>

              <div>
                <h2 className="text-5xl font-bold">4.9★</h2>
                <p className="mt-2 text-rose-100">Customer Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
