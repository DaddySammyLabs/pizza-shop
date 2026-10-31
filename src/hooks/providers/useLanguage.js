//   src//hooks/useLanguage.js

import { useEffect, useState } from "react";

function useLanguage(defaultLang = "ru") {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || defaultLang,
  );

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return {
    language,
    setLanguage,
  };
}

export default useLanguage;

// toUse: 1-import, 2-cont, 3-comp, 4-pros

// 1-import texts + useLanguage + LanguageSwitcher
// import texts from "./constants/texts";
// import useLanguage from "./hooks/useLanguage";
// import LanguageSwitcher from "./components/languages/LanguageSwitcher";

// 2-set-variable via-default or without-def-value
// const [language, setLanguage] = useState("ru");
// const { language, setLanguage } = useLanguage();

// 3-use-in-component & 4-pros
// <>
//   <LanguageSwitcher language={language} setLanguage={setLanguage} />
//   <Header texts={texts[language]} />
// </>;
