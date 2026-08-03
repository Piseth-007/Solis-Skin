export default function OrderItem({ order }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">Order Items</h2>

      <div className="space-y-5">
        {order.items?.map((item) => (
          <div
            key={item.productId}
            className="flex items-center gap-5 border-b border-gray-100 pb-5 last:border-none last:pb-0"
          >
            <img
              src={`http://localhost:8080${item.productImage}`}
              alt={item.productName}
              className="h-24 w-24 rounded-2xl border bg-white object-contain p-2"
            />

            <div className="flex-1">
              <h3 className="text-lg font-semibold">{item.productName}</h3>

              <p className="mt-1 text-sm text-gray-500">
                Quantity: {item.quantity}
              </p>
            </div>

            <div className="text-right">
              <p className="text-lg font-bold">
                ${Number(item.price).toFixed(2)}
              </p>

              <p className="text-sm text-gray-500">
                Subtotal: ${Number(item.subtotal).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
