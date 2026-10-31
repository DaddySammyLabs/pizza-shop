/* src/components/theme/SwitcherTheme.jsx */
import { useApp } from "@/context/AppContext";

import "./SwitcherTheme.css";

import sunIcon from "../../../assets/icons/icon-sun.svg";
import moonIcon from "../../../assets/icons/icon-moon.png";

function SwitcherTheme({}) {
  const { theme, toggleTheme } = useApp();
  return (
    <>
      <div className="switch-theme theme-mobile" onClick={toggleTheme}>
        <div className={`toggle toggle-mobile ${theme}`}>
          {/* <span className="icon-toggle">{theme === "light" ? "☀︎" : "☾"}</span> */}
          <img
            className="icon-toggle icon-toggle-mobile"
            src={theme === "light" ? sunIcon : moonIcon}
            alt={theme}
          />
        </div>
      </div>
    </>
  );
}

export default SwitcherTheme;

// import "./SwitcherTheme.css";

// function SwitcherTheme({ theme, toggleTheme }) {
//   return (
//     <div className="switch-theme" onClick={toggleTheme}>
//       <div className={`toggle ${theme}`}>
//         {/* <span className="icon-toggle">{theme === "light" ? "☀️" : "🌙"}</span> */}
//         <span className="icon-toggle">{theme === "light" ? "☀︎" : "☾"}</span>
//       </div>
//     </div>
//   );
// }

// export default SwitcherTheme;
