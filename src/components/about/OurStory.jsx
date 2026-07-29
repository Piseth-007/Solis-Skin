import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import storyImage from "../../assets/about/about-story.png";

const features = [
  "100% Authentic Skincare Products",
  "Trusted Global Beauty Brands",
  "Dermatologist Recommended",
  "Fast & Secure Delivery",
];

export default function OurStory() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-20 px-6 lg:grid-cols-2">
        {/* Image */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <img
            src={storyImage}
            alt="Our Story"
            className="rounded-[40px] shadow-2xl"
          />

          {/* Experience Card */}

          <div className="absolute -bottom-8 left-8 rounded-3xl bg-white p-8 shadow-xl">
            <h3 className="text-4xl font-bold text-rose-600">5+</h3>

            <p className="mt-2 text-gray-500">
              Years Delivering
              <br />
              Premium Skincare
            </p>
          </div>
        </motion.div>

        {/* Content */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="rounded-full bg-rose-100 px-5 py-2 text-sm font-semibold text-rose-600">
            Our Story
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Passionate About
            <br />
            Healthy Skin
          </h2>

          <p className="mt-8 leading-8 text-gray-600">
            Solis Skin was founded with one simple vision: make authentic,
            effective skincare accessible to everyone. We carefully select
            premium products from globally trusted brands so our customers can
            shop with confidence.
          </p>

          <p className="mt-6 leading-8 text-gray-600">
            Whether you're starting your first skincare routine or searching for
            advanced treatments, our goal is to help you discover products that
            truly work for your skin. Every product in our store is carefully
            chosen based on quality, safety, and customer satisfaction.
          </p>

          {/* Features */}

          <div className="mt-10 grid gap-5">
            {features.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 size={22} className="text-green-500" />

                <span className="font-medium text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
