import { Link, useParams } from "react-router-dom";
import products from "../data/products";

import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import ProductTabs from "../components/product/ProductTabs";
import RelatedProducts from "../components/product/RelatedProducts";

import RatingSummary from "../components/reviews/RatingSummary";
import ReviewList from "../components/reviews/ReviewList";

export default function ProductDetail() {
  const { id } = useParams();

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <h2 className="text-3xl font-bold">Product Not Found</h2>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-rose-500">
              Home
            </Link>

            <span>/</span>

            <Link to="/shop" className="hover:text-rose-500">
              Shop
            </Link>

            <span>/</span>

            <span className="font-medium text-black">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Product */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-16 lg:grid-cols-2">
          <ProductGallery product={product} />

          <ProductInfo product={product} />
        </div>

        {/* Description / Ingredients / Usage */}
        <ProductTabs product={product} />

        {/* Customer Reviews */}
        <section className="mt-20">
          <h2 className="mb-8 text-3xl font-bold">Customer Reviews</h2>

          <div className="space-y-8">
            <RatingSummary productId={product.id} />

            <ReviewList productId={product.id} />
          </div>
        </section>

        {/* Related Products */}
        <div className="mt-20">
          <RelatedProducts product={product} />
        </div>
      </section>
    </main>
  );
}
