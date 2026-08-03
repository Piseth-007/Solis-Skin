import { useEffect, useState } from "react";

import { getProducts } from "../../api/productApi";
import ProductCard from "../common/ProductCard";

export default function RelatedProducts({ product }) {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    loadRelatedProducts();
  }, [product]);

  const loadRelatedProducts = async () => {
    try {
      const products = await getProducts();

      const related = products
        .filter(
          (item) =>
            item.categoryId === product.categoryId && item.id !== product.id,
        )
        .slice(0, 4);

      setRelatedProducts(related);
    } catch (error) {
      console.error("Failed to load related products:", error);
    }
  };

  if (!relatedProducts.length) return null;

  return (
    <section className="mt-20">
      <h2 className="mb-8 text-3xl font-bold">Related Products</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {relatedProducts.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
}
