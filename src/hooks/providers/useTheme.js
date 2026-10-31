import { useLayoutEffect, useEffect, useState } from "react";

function useTheme(defaultTheme = "dark") {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || defaultTheme,
  );

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // useEffect(() => {
  //   localStorage.setItem("theme", theme);
  //   document.body.className = theme;
  // }, [theme]);
  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return {
    theme,
    toggleTheme,
    setTheme,
  };
}

export default useTheme;

// toUse: 1-import, 2-cont, 3-comp

// 1-import useTheme + SwitcherTheme
// import useTheme from "../hooks/useTheme";
// import SwitcherTheme from "../components/theme/SwitcherTheme";

// 2-set-variable
// const { theme, toggleTheme } = useTheme();

// 3-use-in-component
// <>
//   <SwitcherTheme theme={theme} toggleTheme={toggleTheme} />
// </>;
