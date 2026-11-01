import { useState } from "react";

export const useCart = () => {
  const [cart, setCart] = useState([]);

  // Общее количество товаров
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Добавление товара
  const addToCart = (pizza) => {
    setCart((prevCart) => {
      const existingPizza = prevCart.find((item) => item.id === pizza.id);

      if (existingPizza) {
        return prevCart.map((item) =>
          item.id === pizza.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prevCart, { ...pizza, quantity: 1 }];
    });
  };

  // Изменение количества товара
  const changeQuantity = (id, amount) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + amount } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  return {
    cart,
    cartCount,
    addToCart,
    changeQuantity,
  };
};
