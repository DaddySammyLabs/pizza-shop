// src/components/languages/LangSwitcher.jsx
import { useApp } from "@/context/AppContext";

import styles from "./LangSwitcher.module.css";

const LanguageSwitcher = () => {
  const { language, setLanguage, isMobile } = useApp();
  return (
    <div
      className={`${styles.languageSwitcher} ${!isMobile ? styles.langsVertical : ""} ${styles.langSwitherMobile}`}
    >
      <button
        className={language === "uz" ? styles.active : ""}
        onClick={() => setLanguage("uz")}
      >
        UZ
      </button>

      <button
        className={language === "en" ? styles.active : ""}
        onClick={() => setLanguage("en")}
      >
        EN
      </button>

      <button
        className={language === "ru" ? styles.active : ""}
        onClick={() => setLanguage("ru")}
      >
        RU
      </button>
    </div>
  );
};

export default LanguageSwitcher;

// import "./LangSwitcher.css";

// function LanguageSwitcher({ language, setLanguage }) {
//   return (
//     <div className="language-switcher lang-swither-mobile">
//       <button
//         className={language === "uz" ? "active" : ""}
//         onClick={() => setLanguage("uz")}
//       >
//         UZ
//       </button>
//       <button
//         className={language === "en" ? "active" : ""}
//         onClick={() => setLanguage("en")}
//       >
//         EN
//       </button>
//       <button
//         className={language === "ru" ? "active" : ""}
//         onClick={() => setLanguage("ru")}
//       >
//         RU
//       </button>
//     </div>
//   );
// }

// export default LanguageSwitcher;
