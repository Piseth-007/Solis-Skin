import { Heart, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

import { useWishlist } from "../context/WishListContext";

import WishlistItem from "../components/wishlist/WishListItem";
import EmptyWishlist from "../components/wishlist/EmptyWishList";

export default function Wishlist() {
  const { wishlist, clearWishlist } = useWishlist();

  const totalValue = wishlist.reduce((sum, item) => sum + item.price, 0);

  const handleClearWishlist = async () => {
    if (wishlist.length === 0) return;

    const result = await Swal.fire({
      title: "Clear Wishlist?",
      text: "This will remove all products from your wishlist.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, clear it",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    clearWishlist();

    Swal.fire({
      title: "Wishlist Cleared!",
      text: "All wishlist items have been removed.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  if (wishlist.length === 0) {
    return <EmptyWishlist />;
  }

  return (
    <section className="bg-gray-50 py-12 min-h-screen">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-10 rounded-3xl bg-linear-to-r from-rose-500 via-pink-500 to-rose-600 p-8 text-white shadow-xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <Heart size={34} className="fill-white" />

                <h1 className="text-4xl font-bold">My Wishlist</h1>
              </div>

              <p className="mt-3 text-rose-100">
                Save your favorite skincare products and purchase them anytime.
              </p>
            </div>

            <div className="flex flex-wrap gap-5">
              <div className="rounded-2xl bg-white/20 px-6 py-4 backdrop-blur">
                <p className="text-sm text-rose-100">Saved Products</p>

                <h2 className="text-3xl font-bold">{wishlist.length}</h2>
              </div>

              <div className="rounded-2xl bg-white/20 px-6 py-4 backdrop-blur">
                <p className="text-sm text-rose-100">Estimated Value</p>

                <h2 className="text-3xl font-bold">${totalValue.toFixed(2)}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Saved Items</h2>

          <button
            onClick={handleClearWishlist}
            className="flex items-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-3 font-semibold text-red-600 transition hover:bg-red-50"
          >
            <Trash2 size={18} />
            Clear Wishlist
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {wishlist.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  x: 80,
                }}
                transition={{
                  duration: 0.3,
                }}
              >
                <WishlistItem product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
