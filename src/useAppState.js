import useLanguage from "./hooks/providers/useLanguage";
import useTheme from "./hooks/providers/useTheme";

import { useCategories } from "@/hooks/useCategories";
import useCart from "./hooks/api/useCart";
import useOrders from "./hooks/useOrders";

const useAppState = () => {
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const {
    activeCategory,
    setActiveCategory,
    filteredPizzas,
    loading,
    error,
    refetch,
  } = useCategories();

  const {
    cart,
    cartCount,
    totalPrice,
    addToCart,
    changeQuantity,
    removeFromCart,
    clearCart,
    loading: cartLoading,
    error: cartError,
    refetch: reLoadCart,
  } = useCart("https://8b4a20fa1260a041.mokky.dev/cart");

  const { orders, loadingOrders, errorOrders, addOrder } = useOrders();

  // Оформление заказа
  // const checkout = async () => {
  //   if (!cart.length) return;

  //   // Сохраняем заказ
  //   const newOrder = addOrder(cart, totalPrice);

  //   if (!newOrder) return;

  //   // Очищаем корзину
  //   await clearCart();

  //   return newOrder;
  // };
  const checkout = async () => {
    if (!cart.length) return null;

    const newOrder = await addOrder(cart, totalPrice);

    if (!newOrder) return null;

    await clearCart();

    return newOrder;
  };

  return {
    language,
    setLanguage,
    theme,
    toggleTheme,

    activeCategory,
    setActiveCategory,
    filteredPizzas,
    loading,
    error,
    refetch,

    cart,
    cartCount,
    totalPrice,
    addToCart,
    changeQuantity,
    removeFromCart,
    clearCart,
    cartLoading,
    cartError,
    reLoadCart,

    orders,
    loadingOrders,
    errorOrders,
    checkout,
  };
};

export default useAppState;
