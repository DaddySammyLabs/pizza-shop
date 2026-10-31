// src/components/theme/ThemeSwitcher.jsx

import useTheme from "../../hooks/Theme";
import sunIcon from "../../assets/icons/icon-sun.svg";
import moonIcon from "../../assets/icons/icon-moon.png";
import "./SwitcherTheme.css";

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const isDarkTheme = theme === "dark";

  return (
    <div className="switch-theme" onClick={toggleTheme}>
      <div
        className={`toggle ${theme === "light" ? "theme light" : "theme dark"}`}
      >
        <img
          className="icon-toggle"
          src={isDarkTheme ? moonIcon : sunIcon}
          alt={theme}
        />
      </div>
    </div>
  );
}

export default ThemeSwitcher;
