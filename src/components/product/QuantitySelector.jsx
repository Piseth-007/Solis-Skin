export default function QuantitySelector({ quantity, setQuantity, stock = 0 }) {
  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increase = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className="flex w-fit items-center rounded-xl border">
      <button
        onClick={decrease}
        disabled={quantity <= 1}
        className="px-4 py-3 text-xl disabled:cursor-not-allowed disabled:opacity-40"
      >
        −
      </button>

      <span className="min-w-12 text-center font-semibold">{quantity}</span>

      <button
        onClick={increase}
        disabled={quantity >= stock}
        className="px-4 py-3 text-xl disabled:cursor-not-allowed disabled:opacity-40"
      >
        +
      </button>
    </div>
  );
}
