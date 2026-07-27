import Countdown from "./Countdown";
import FlashSaleCard from "./FlashSaleCard";
import flashSale from "../../data/flashSale";

export default function FlashSale() {
  return (
    <section className="py-24 bg-linear-to-r from-rose-50 to-pink-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-16">
          <div>
            <p className="uppercase tracking-[4px] text-red-500">
              Limited Time Offer
            </p>

            <h2 className="text-5xl font-bold mt-3">Flash Sale</h2>

            <Countdown />
          </div>

          <button className="mt-8 lg:mt-0 bg-rose-600 text-white px-8 py-4 rounded-full hover:bg-rose-700">
            View All Deals
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {flashSale.map((item) => (
            <FlashSaleCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
