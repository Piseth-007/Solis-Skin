export default function QuantitySelector({ quantity, setQuantity }) {
  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increase = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="flex w-fit items-center rounded-xl border">
      <button onClick={decrease} className="px-4 py-3 text-xl">
        −
      </button>

      <span className="min-w-12 text-center font-semibold">{quantity}</span>

      <button onClick={increase} className="px-4 py-3 text-xl">
        +
      </button>
    </div>
  );
}
