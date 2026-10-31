import { useEffect, useCallback, useState } from "react";

import "./ModalMenu.css";

// import LanguageSwitcher from "../LangSwitcher";
//  {language, setLanguage,}

function ModalMenu({ show, onClose, children }) {
  const [isMounted, setIsMounted] = useState(show);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (show) {
      setIsMounted(true);
      document.addEventListener("keydown", handleKeyDown);
    } else {
      const timer = setTimeout(() => {
        setIsMounted(false);
      }, 50);

      return () => clearTimeout(timer);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [show, handleKeyDown]);

  if (!isMounted) return null;

  const handleLinkClick = (callback) => {
    callback();
    onClose();
  };

  return (
    <div className={`menu-overlay ${show ? "show" : ""}`} onClick={onClose}>
      <aside
        className={`menu-panel ${show ? "open" : "close"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="menu-language">
          {children}
          {/* <LanguageSwitcher language={language} setLanguage={setLanguage} /> */}
        </div>
      </aside>
    </div>
  );
}

export default ModalMenu;

// if(separate: hook & components) {
//   useModalMenu.js
//
//   components 2x in one.jsx
//   export function ButtonLangSwitcher;
//   export function ModalMenu;
// }

// const ButtonLangSwitcher = ({ theme, open }) => {
//   return (
//     <>
//       <span type="button" className={styles.menu} onClick={open}>
//         <img
//           src={theme === "light" ? "/icons/bars_dark.svg" : "/icons/bars.svg"}
//           alt="menu-navbar"
//         />
//       </span>
//     </>
//   );
// };
// export default ButtonLangSwitcher;
