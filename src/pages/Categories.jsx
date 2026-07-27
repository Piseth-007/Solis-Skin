import categories from "../data/categories";
import CategoryCard from "../components/category/CategoryCard";

export default function Categories() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h1 className="text-5xl font-bold">Shop by Category</h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-500">
            Discover skincare collections designed for every skin type and
            concern.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>
    </main>
  );
}
