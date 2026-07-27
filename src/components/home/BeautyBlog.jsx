import blogs from "../../data/blogs";
import BlogCard from "./BlogCard";

export default function BeautyBlog() {
  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[4px] text-rose-500">
              Beauty Journal
            </span>

            <h2 className="mt-4 text-5xl font-bold">Latest Articles</h2>

            <p className="mt-4 max-w-2xl text-lg text-gray-500">
              Learn skincare tips, product recommendations, and healthy beauty
              habits from our experts.
            </p>
          </div>

          <button className="hidden rounded-full border border-rose-500 px-6 py-3 font-semibold text-rose-600 transition hover:bg-rose-600 hover:text-white lg:block">
            View All
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
}
