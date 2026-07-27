import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import EmptyCart from "../components/cart/EmptyCart";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart } = useCart();

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>

          <p className="mt-2 text-gray-500">
            Review your items before proceeding to checkout.
          </p>
        </div>

        {/* Layout */}
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Left */}
          <div className="space-y-6 lg:col-span-2">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Right */}
          <CartSummary />
        </div>
      </div>
    </section>
  );
}
