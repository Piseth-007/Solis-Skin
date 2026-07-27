import { Package, Heart, ShoppingBag, Star, ArrowUpRight } from "lucide-react";

export default function ProfileStats({
  orders = 0,
  wishlist = 0,
  cart = 0,
  reviews = 0,
}) {
  const stats = [
    {
      title: "Orders",
      value: orders,
      subtitle: "Completed Orders",
      icon: Package,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      title: "Wishlist",
      value: wishlist,
      subtitle: "Saved Products",
      icon: Heart,
      bg: "bg-rose-100",
      text: "text-rose-600",
    },
    {
      title: "Cart",
      value: cart,
      subtitle: "Items in Cart",
      icon: ShoppingBag,
      bg: "bg-amber-100",
      text: "text-amber-600",
    },
    {
      title: "Reviews",
      value: reviews,
      subtitle: "Reviews Written",
      icon: Star,
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="group rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="mb-5 flex items-start justify-between">
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.bg}`}
              >
                <Icon className={item.text} size={26} />
              </div>

              <ArrowUpRight
                size={18}
                className="text-gray-300 transition group-hover:text-rose-500"
              />
            </div>

            <h2 className="text-4xl font-bold text-gray-900">{item.value}</h2>

            <h3 className="mt-2 text-lg font-semibold text-gray-800">
              {item.title}
            </h3>

            <p className="mt-1 text-sm text-gray-500">{item.subtitle}</p>
          </div>
        );
      })}
    </div>
  );
}
