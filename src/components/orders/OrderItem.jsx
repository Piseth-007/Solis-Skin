export default function OrderItem({ order }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">Order Items</h2>

      <div className="space-y-5">
        {order.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-5 border-b border-gray-100 pb-5 last:border-none last:pb-0"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-24 w-24 rounded-2xl object-cover border"
            />

            <div className="flex-1">
              <h3 className="text-lg font-semibold">{item.name}</h3>

              <p className="mt-1 text-sm text-gray-500">Quantity: {item.qty}</p>
            </div>

            <div className="text-right">
              <p className="font-bold text-lg">${item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
