import { useState } from "react";

const useFilters = ({ items }) => {
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("title");

  const onChangeSearchValue = (event) => {
    // console.log(event.target.value);
    setSearchValue(event.target.value);
  };

  const clearInput = () => setSearchValue("");

  // sorting

  const onChangeSortValue = (event) => {
    setSortValue(event.target.value);
  };

  const sortedItems = [...items].sort((a, b) => {
    if (sortValue === "priceCheap") {
      return a.price - b.price;
    }

    if (sortValue === "priceExpensive") {
      return b.price - a.price;
    }

    if (sortValue === "title") {
      return a.title.localeCompare(b.title);
    }

    return 0;
  });

  return {
    items: sortedItems,

    searchValue,
    onChangeSearchValue,
    clearInput,

    sortValue,
    onChangeSortValue,
  };
};

export default useFilters;

// Весь код человеческим языком -> const sortedItems = [...
// Возьми копию массива items.
// Перебери товары попарно (a и b).
// Если выбрана сортировка по дешёвой цене — поставь дешёвые товары первыми.
// Если выбрана сортировка по дорогой цене — поставь дорогие первыми.
// Если выбрана сортировка по названию — расположи товары по алфавиту.
// Результат положи в sortedItems.
