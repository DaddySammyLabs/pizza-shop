import { useEffect, useState } from "react";
import { API, ENDPOINTS } from "@/api/api";

import useToggle from "./useToggle";

const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  const {
    value: isFavorite,
    add: addFavorite,
    remove: removeFavorite,
    toggle: toggleFavorite,
  } = useToggle();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const { data } = await API.get(ENDPOINTS.FAVORITES);

        setFavorites(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavorites();
  }, []);

  const addToFavorite = async (obj) => {
    try {
      // const { data } = await API.post("/cart", obj);
      const { data } = await API.post(ENDPOINTS.FAVORITES, {
        itemId: obj.id,
        title: obj.title,
        price: obj.price,
        imageUrl: obj.imageUrl,
      });

      setFavorites((prevItems) => [...prevItems, data]);
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromFavorites = async (id) => {
    try {
      await API.delete(`${ENDPOINTS.FAVORITES}/${id}`);

      setFavorites((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return {
    favorites,
    addToFavorite,
    removeFromFavorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
  };
};

export default useFavorites;
