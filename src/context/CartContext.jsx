import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("solis-cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("solis-cart", JSON.stringify(cart));
  }, [cart]);

  // ===============================
  // Add Product
  // ===============================
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === product.id);
      
      if (exist) {
        const newQuantity = Math.min(
          exist.quantity + quantity,
          product.stock ?? Infinity,
        );

        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: newQuantity,
              }
            : item,
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: Math.min(quantity, product.stock ?? quantity),
        },
      ];
    });
  };

  // ===============================
  // Remove Product
  // ===============================
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // ===============================
  // Increase Quantity
  // ===============================
  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        return {
          ...item,
          quantity: Math.min(item.quantity + 1, item.stock ?? Infinity),
        };
      }),
    );
  };

  // ===============================
  // Decrease Quantity
  // ===============================
  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        return {
          ...item,
          quantity: Math.max(1, item.quantity - 1),
        };
      }),
    );
  };

  // ===============================
  // Update Quantity
  // ===============================
  const updateQuantity = (id, quantity) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        return {
          ...item,
          quantity: Math.min(Math.max(1, quantity), item.stock ?? Infinity),
        };
      }),
    );
  };

  // ===============================
  // Clear Cart
  // ===============================
  const clearCart = () => {
    setCart([]);
  };

  // ===============================
  // Totals
  // ===============================
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
