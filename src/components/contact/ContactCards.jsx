import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const contacts = [
  {
    icon: Phone,
    title: "Call Us",
    value: "+855 12 345 678",
    description: "Mon - Sat, 8:00 AM - 6:00 PM",
  },
  {
    icon: Mail,
    title: "Email",
    value: "support@solisskin.com",
    description: "We'll reply within 24 hours",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    value: "Phnom Penh, Cambodia",
    description: "Open for customer pickup",
  },
  {
    icon: Clock,
    title: "Working Hours",
    value: "Mon - Sat",
    description: "8:00 AM - 6:00 PM",
  },
];

export default function ContactCards() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {contacts.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                }}
                whileHover={{
                  y: -8,
                }}
                className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition hover:border-rose-100 hover:shadow-2xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 transition group-hover:bg-rose-600 group-hover:text-white">
                  <Icon size={30} />
                </div>

                <h3 className="mt-8 text-xl font-bold text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-3 font-medium text-rose-600">{item.value}</p>

                <p className="mt-2 text-sm leading-6 text-gray-500">
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
