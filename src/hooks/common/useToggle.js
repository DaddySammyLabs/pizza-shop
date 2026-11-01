import { useState } from "react";

const useToggle = () => {
  const [value, setValue] = useState(false);

  const add = () => setValue(true);
  const remove = () => setValue(false);

  // const toggle = () => setValue(!value);
  const toggle = () => setValue((prev) => !prev);

  return {
    add,
    remove,
    value,
    toggle,
  };
};

export default useToggle;

// better way than -> const toggle = () => setValue(!value);
// setCount((prev) => prev + 1);
// setIsOpen((prev) => !prev);
// setItems((prev) => [...prev, newItem]);

// useEffect(() => {
//   console.log(
//     "useEffect it's mean: if change var(isAdded) then: do something",
//   );
// }, [isAdded]);
