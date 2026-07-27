import instagram from "../../data/instagram";
import InstagramCard from "./InstagramCard";

export default function InstagramGallery() {
  return (
    <section className="bg-rose-50 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-rose-600 shadow">
            @solisskin
          </span>

          <h2 className="mt-6 text-5xl font-bold">Follow Us On Instagram</h2>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-500">
            Discover skincare inspiration, customer transformations, and our
            latest product launches.
          </p>

          <button className="mt-10 rounded-full bg-rose-600 px-8 py-4 font-semibold text-white shadow-xl transition hover:scale-105 hover:bg-rose-700">
            Follow Instagram
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {instagram.map((item) => (
            <InstagramCard key={item.id} image={item.image} />
          ))}
        </div>
      </div>
    </section>
  );
}
