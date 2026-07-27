import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import Countdown from "./Countdown";
import FlashSaleCard from "./FlashSaleCard";
import products from "../../data/products";

export default function FlashSale() {
  const flashSale = products.filter((product) => product.flashSale).slice(0, 4);
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-rose-50 via-white to-rose-50 py-24">
      {/* Background */}

      <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-rose-200/20 blur-3xl"></div>

      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-pink-200/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
          <div>
            <span className="inline-flex rounded-full bg-red-100 px-5 py-2 text-sm font-semibold text-red-600">
              🔥 Limited Time Offer
            </span>

            <h2 className="mt-6 text-4xl font-bold md:text-5xl">Flash Sale</h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-500">
              Save big on our most popular skincare products before the deals
              disappear.
            </p>

            <div className="mt-8">
              <Countdown />
            </div>
          </div>

          <Link
            to="/shop?flashSale=true"
            className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-7 py-4 font-semibold text-white transition hover:bg-rose-700"
          >
            View All Deals
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {flashSale.map((item) => (
            <FlashSaleCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
