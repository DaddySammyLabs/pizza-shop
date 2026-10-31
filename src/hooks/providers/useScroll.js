import { useEffect, useState } from "react";

const useScroll = () => {
  const [scroll, setScroll] = useState(0);
  const scrollUp = () => {
    setScroll(window.scrollX);
  };

  const upButton = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useState(() => {
    window.addEventListener("scroll", scrollUp);
  }, []);

  const toBlock = (height) => {
    window.scrollTo({ top: height, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY);

    window.addEventListener("scroll", handleScroll);

    // cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return {
    scroll,
    upButton,
    toBlock,
  };
};

export default useScroll;
