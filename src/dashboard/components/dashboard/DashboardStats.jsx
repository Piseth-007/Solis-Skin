import { Package, ShoppingCart, Users, Layers, DollarSign } from "lucide-react";

const cards = [
  {
    key: "products",
    title: "Products",
    icon: Package,
    color: "bg-blue-500",
  },
  {
    key: "categories",
    title: "Categories",
    icon: Layers,
    color: "bg-green-500",
  },
  {
    key: "orders",
    title: "Orders",
    icon: ShoppingCart,
    color: "bg-amber-500",
  },
  {
    key: "customers",
    title: "Customers",
    icon: Users,
    color: "bg-pink-500",
  },
  {
    key: "revenue",
    title: "Revenue",
    icon: DollarSign,
    color: "bg-emerald-500",
    currency: true,
  },
];

export default function DashboardStats({ stats }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => {
        const Icon = card.icon;

        const value = card.currency
          ? `$${Number(stats?.[card.key] ?? 0).toLocaleString()}`
          : Number(stats?.[card.key] ?? 0).toLocaleString();

        return (
          <div
            key={card.key}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold text-slate-900">
                  {value}
                </h2>

                <div className="mt-4 flex items-center gap-2 text-sm">
                  <span className="rounded-full bg-green-100 px-2 py-1 font-medium text-green-700">
                    +12%
                  </span>

                  <span className="text-slate-500">vs last month</span>
                </div>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.color} text-white shadow`}
              >
                <Icon size={28} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
