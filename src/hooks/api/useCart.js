import { useState, useEffect, useCallback } from "react";
import axios from "axios";

// Получение корзины с сервера при монтировании.
// Добавление товара через POST.
// Увеличение и уменьшение количества товара.
// Удаление товара через DELETE, если количество становится 0.
// Подсчёт общего количества товаров.
// Подсчёт общей стоимости.
// Очистка корзины на сервере.
// loading, error, refetch.

const useCart = (url) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requestKey, setRequestKey] = useState(0);

  // Получение корзины
  const fetchCart = useCallback(
    async (signal) => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await axios.get(url, { signal });
        setCart(data);
      } catch (err) {
        if (err.name !== "CanceledError" && err.code !== "ERR_CANCELED") {
          setError(err.message || "Something went wrong");
        }
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
        }
      }
    },
    [url],
  );

  useEffect(() => {
    const controller = new AbortController();

    fetchCart(controller.signal);

    return () => controller.abort();
  }, [fetchCart, requestKey]);

  // Повторный запрос
  const refetch = useCallback(() => {
    setRequestKey((key) => key + 1);
  }, []);

  // Добавление товара
  const addToCart = async (product) => {
    try {
      const existingItem = cart.find(
        (item) => item.itemId === product.id || item.id === product.id,
      );

      if (existingItem) {
        const { data } = await axios.patch(`${url}/${existingItem.id}`, {
          quantity: (existingItem.quantity || 1) + 1,
        });

        setCart((prev) =>
          prev.map((item) => (item.id === existingItem.id ? data : item)),
        );
      } else {
        const { data } = await axios.post(url, {
          itemId: product.id,
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: 1,
        });

        setCart((prev) => [...prev, data]);
      }
    } catch (err) {
      setError(err.message || "Failed to add item");
    }
  };

  // Изменение количества
  const changeQuantity = async (id, amount) => {
    const item = cart.find((item) => item.id === id);

    if (!item) return;

    const newQuantity = (item.quantity || 1) + amount;

    try {
      if (newQuantity <= 0) {
        await axios.delete(`${url}/${id}`);

        setCart((prev) => prev.filter((item) => item.id !== id));
      } else {
        const { data } = await axios.patch(`${url}/${id}`, {
          quantity: newQuantity,
        });

        setCart((prev) => prev.map((item) => (item.id === id ? data : item)));
      }
    } catch (err) {
      setError(err.message || "Failed to update cart");
    }
  };

  // Удаление одного товара
  const removeFromCart = async (id) => {
    try {
      await axios.delete(`${url}/${id}`);

      setCart((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.message || "Failed to remove item");
    }
  };

  // Очистка корзины
  const clearCart = async () => {
    try {
      await Promise.all(cart.map((item) => axios.delete(`${url}/${item.id}`)));

      setCart([]);
    } catch (err) {
      setError(err.message || "Failed to clear cart");
    }
  };

  // Общее количество товаров
  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  // Общая стоимость
  const totalPrice = cart.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity || 1),
    0,
  );

  return {
    cart,
    setCart,

    cartCount,
    totalPrice,

    loading,
    error,
    refetch,

    addToCart,
    changeQuantity,
    removeFromCart,
    clearCart,
  };
};

export default useCart;
