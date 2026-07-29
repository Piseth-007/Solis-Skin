import { motion } from "framer-motion";
import { HeartHandshake, Sparkles } from "lucide-react";

const cards = [
  {
    title: "Our Mission",
    icon: HeartHandshake,
    description:
      "To provide authentic, dermatologist-recommended skincare products that empower everyone to build healthy skin with confidence. We carefully curate every product to ensure quality, effectiveness, and trust.",
  },
  {
    title: "Our Vision",
    icon: Sparkles,
    description:
      "To become Cambodia's most trusted online skincare destination by connecting people with world-class beauty brands, exceptional customer service, and expert skincare education.",
  },
];

export default function MissionVision() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-rose-50 via-white to-rose-50 py-24">
      {/* Background */}

      <div className="absolute -left-40 top-10 h-80 w-80 rounded-full bg-rose-200/20 blur-3xl"></div>

      <div className="absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-pink-200/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-rose-100 px-5 py-2 text-sm font-semibold text-rose-600">
            Our Purpose
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Mission & Vision
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-500">
            Everything we do is guided by our commitment to helping people
            discover healthier skin through trusted products, expert knowledge,
            and exceptional customer experiences.
          </p>
        </div>

        {/* Cards */}

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {cards.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
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
                  duration: 0.6,
                  delay: index * 0.2,
                }}
                whileHover={{
                  y: -8,
                }}
                className="rounded-4xl border border-rose-100 bg-white p-10 shadow-sm transition hover:shadow-2xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
                  <Icon size={32} />
                </div>

                <h3 className="mt-8 text-3xl font-bold text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-6 leading-8 text-gray-600">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
