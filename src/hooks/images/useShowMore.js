import { useState } from "react";

const useShowMore = (items, initialCount = 4, step = 3) => {
  const [visibleCount, setVisibleCount] = useState(initialCount);

  const visibleItems = items.slice(0, visibleCount);
  const showAll = visibleCount >= items.length;

  const handleToggle = () => {
    if (showAll) {
      setVisibleCount(initialCount);
    } else {
      setVisibleCount((prev) => Math.min(prev + step, items.length));
    }
  };

  return { visibleCount, visibleItems, showAll, handleToggle };
};

export default useShowMore;
