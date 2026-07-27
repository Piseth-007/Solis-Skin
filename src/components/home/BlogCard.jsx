import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function BlogCard({ blog }) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-[28px] bg-white shadow-md hover:shadow-2xl transition"
    >
      <div className="overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="h-72 w-full object-cover duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-7">
        <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-600">
          {blog.category}
        </span>

        <h3 className="mt-5 text-2xl font-bold leading-snug">{blog.title}</h3>

        <div className="mt-5 flex items-center justify-between text-gray-500">
          <span>{blog.date}</span>
          <span>{blog.readTime}</span>
        </div>

        <button className="mt-8 flex items-center gap-2 font-semibold text-rose-600">
          Read Article
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition"
          />
        </button>
      </div>
    </motion.article>
  );
}
