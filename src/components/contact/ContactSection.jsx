import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

export default function ContactSection() {
  return (
    <section className="bg-rose-50/40 py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
        {/* ================= Left: Contact Form ================= */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-4xl bg-white p-10 shadow-xl"
        >
          <span className="rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-600">
            Send Message
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Get In Touch
          </h2>

          <p className="mt-4 text-gray-500">
            Fill out the form below and our team will get back to you as soon as
            possible.
          </p>

          <form className="mt-10 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <input
                type="text"
                placeholder="Full Name"
                className="rounded-xl border border-gray-200 p-4 outline-none transition focus:border-rose-500"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="rounded-xl border border-gray-200 p-4 outline-none transition focus:border-rose-500"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <input
                type="text"
                placeholder="Phone Number"
                className="rounded-xl border border-gray-200 p-4 outline-none transition focus:border-rose-500"
              />

              <input
                type="text"
                placeholder="Subject"
                className="rounded-xl border border-gray-200 p-4 outline-none transition focus:border-rose-500"
              />
            </div>

            <textarea
              rows={6}
              placeholder="Write your message..."
              className="w-full rounded-xl border border-gray-200 p-4 outline-none transition focus:border-rose-500"
            ></textarea>

            <button
              type="submit"
              className="w-full rounded-xl bg-linear-to-r from-rose-600 to-pink-500 py-4 font-semibold text-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Send Message
            </button>
          </form>
        </motion.div>

        {/* ================= Right: Store Information ================= */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="rounded-4xl bg-white p-10 shadow-xl">
            <h2 className="text-3xl font-bold text-gray-900">
              Store Information
            </h2>

            <p className="mt-4 text-gray-500">
              Feel free to contact us through any of the following channels.
            </p>

            <div className="mt-10 space-y-8">
              <div className="flex items-start gap-5">
                <div className="rounded-xl bg-rose-100 p-3 text-rose-600">
                  <MapPin size={22} />
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900">Address</h4>
                  <p className="mt-1 text-gray-500">Phnom Penh, Cambodia</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="rounded-xl bg-rose-100 p-3 text-rose-600">
                  <Phone size={22} />
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900">Phone</h4>
                  <p className="mt-1 text-gray-500">+855 12 345 678</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="rounded-xl bg-rose-100 p-3 text-rose-600">
                  <Mail size={22} />
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <p className="mt-1 text-gray-500">support@solisskin.com</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="rounded-xl bg-rose-100 p-3 text-rose-600">
                  <Clock size={22} />
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900">
                    Business Hours
                  </h4>
                  <p className="mt-1 text-gray-500">Monday - Saturday</p>
                  <p className="text-gray-500">8:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

            {/* Social */}

            <div className="mt-12">
              <h4 className="font-semibold text-gray-900">Follow Us</h4>

              <div className="mt-5 flex gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600 transition hover:bg-rose-600 hover:text-white"
                >
                  <FaFacebookF size={18} />
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600 transition hover:bg-rose-600 hover:text-white"
                >
                  <FaInstagram size={18} />
                </a>

                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600 transition hover:bg-rose-600 hover:text-white"
                >
                  <FaTiktok size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* ================= Google Map ================= */}

          <div className="overflow-hidden rounded-4xl shadow-xl">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps?q=Phnom+Penh,+Cambodia&output=embed"
              width="100%"
              height="350"
              loading="lazy"
              className="border-0"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
