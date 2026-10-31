// src/components/languages/LanguageSwitcher.jsx

// import useLanguage from "./useLanguage";

import "./LanguageSwitcher.css";

function LanguageSwitcher({ language, setLanguage }) {
  // function LanguageSwitcher() {
  // const { language, setLanguage } = useLanguage();

  return (
    // <div className="language-switcher">
    <div className="language-switcher lang-swither-mobile">
      <button
        className={language === "en" ? "active" : ""}
        onClick={() => setLanguage("en")}
      >
        EN
      </button>
      <button
        className={language === "ru" ? "active" : ""}
        onClick={() => setLanguage("ru")}
      >
        RU
      </button>
    </div>
  );
}

export default LanguageSwitcher;
