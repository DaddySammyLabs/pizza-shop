import { useState } from "react";
import useFetch from "./api/useFetch";
// import { pizzas } from "@/data/pizzas";

const API_URL = "https://8b4a20fa1260a041.mokky.dev/items";

export const useCategories = () => {
  const [activeCategory, setActiveCategory] = useState("Все");

  const { data: pizzas, loading, error, refetch } = useFetch(API_URL);
  // const { loading, error, refetch } = useFetch(API_URL);

  const filteredPizzas =
    activeCategory === "Все"
      ? pizzas
      : pizzas.filter((pizza) => pizza.category === activeCategory);

  return {
    activeCategory,
    setActiveCategory,
    filteredPizzas,
    loading,
    error,
    refetch,
  };
};
