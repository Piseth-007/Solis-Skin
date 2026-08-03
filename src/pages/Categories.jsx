import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import { getCategories } from "../api/categoryApi";
import CategoryCard from "../components/category/CategoryCard";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to load categories:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="border-b bg-white">
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
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-10 w-10 animate-spin text-rose-600" />
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center text-gray-500">
            No categories available.
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
