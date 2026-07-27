import { Heart } from "lucide-react";

export default function WishlistSummary() {
  return (
    <div className="rounded-3xl bg-linear-to-r from-rose-500 to-pink-500 p-6 text-white">
      <Heart size={34} />

      <h2 className="mt-4 text-3xl font-bold">8</h2>

      <p className="mt-1">Saved Products</p>

      <button className="mt-5 rounded-xl bg-white px-5 py-2 font-semibold text-rose-600 transition hover:bg-gray-100">
        View Wishlist
      </button>
    </div>
  );
}
