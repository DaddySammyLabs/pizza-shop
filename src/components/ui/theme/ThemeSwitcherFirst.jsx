// src/components/theme/ThemeSwitcherFirst.jsx
// first-version
import { useState } from "react";

import "./SwitcherTheme.css";

import Theme from "../../hooks/Theme";

import sunIcon from "../../assets/icons/icon-sun.svg";
import moonIcon from "../../assets/icons/icon-moon.png";

function ThemeSwitcher({}) {
  //   const [theme, setTheme] = useThemeSwitcher();
  const { theme, setTheme } = Theme();

  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  const toggleTheme = () => {
    if (isDarkTheme) {
      lightTheme();
    } else {
      darkTheme();
    }
    setIsDarkTheme(!isDarkTheme);
  };

  const lightTheme = () => {
    setTheme("light");
  };
  const darkTheme = () => {
    setTheme("dark");
  };
  //   toggle
  //   style={{
  //             transform: isDarkTheme ? "translateX(38px)" : "translate(0)",
  //           }}
  return (
    <>
      <div className="switch-theme" onClick={toggleTheme}>
        <div
          className={`toggle ${theme === "light" ? "theme light" : "theme dark"}`}
        >
          <img
            className="icon-toggle"
            src={theme === "light" ? sunIcon : moonIcon}
            alt={theme}
          />
        </div>
      </div>
    </>
  );
}

export default ThemeSwitcher;
