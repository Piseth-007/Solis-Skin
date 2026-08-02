export default function StatCard({
  title,
  value,
  icon,
  iconBg = "bg-pink-100",
  iconColor = "text-pink-600",
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">{value}</h2>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${iconBg}`}
        >
          <div className={iconColor}>{icon}</div>
        </div>
      </div>
    </div>
  );
}
