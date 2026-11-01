import useLanguage from "./hooks/providers/useLanguage";
import useTheme from "./hooks/providers/useTheme";

import { useCategories } from "@/hooks/useCategories";
import useCart from "./hooks/api/useCart";

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
    // refetch: reLoadCards,
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
  };
};

export default useAppState;
