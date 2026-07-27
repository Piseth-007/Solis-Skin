import products from "../../data/products";
import ProductCard from "../common/ProductCard";

export default function RelatedProducts({ product }) {
  const related = products
    .filter(
      (item) => item.category === product.category && item.id !== product.id,
    )
    .slice(0, 4);

  if (!related.length) return null;

  return (
    <section className="mt-20">
      <h2 className="mb-8 text-3xl font-bold">Related Products</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
}
