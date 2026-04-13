import type { CartItem } from "#/types/cart-item";
import { createContext, useContext, useState } from "react";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: CartItem) => void;
  totalCount: number;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (
    productId: string,
    quantity: number,
    operation: "add" | "subtract",
  ) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: CartItem) =>
    setItems((prev) => {
      const existing = items.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item,
        );
      }
      return [...prev, { ...product }];
    });

  const removeFromCart = (productId: string) => {
    setItems((prev) => {
      const existing = items.find((item) => item.id === productId);
      if (!existing) return prev; // Item not found, no change

      return prev.filter((item) => item.id !== productId);
    });
  };

  const updateCartQuantity = (
    productId: string,
    quantity: number,
    operation: "add" | "subtract",
  ) => {
    setItems((prev) => {
      const existing = items.find((item) => item.id === productId);
      if (!existing) return prev; // Item not found, no change

      switch (operation) {
        case "add":
          return prev.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          );
        case "subtract":
          if (existing.quantity <= quantity) {
            // Remove item entirely if quantity to remove is greater or equal
            return prev.filter((item) => item.id !== productId);
          }
          return prev.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity - quantity }
              : item,
          );
        default:
          return prev;
      }
    });
  };

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: items,
        addToCart,
        totalCount,
        removeFromCart,
        updateCartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
