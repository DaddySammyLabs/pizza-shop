// src/utils/scrollHelpers.js

/**
 * Прокрутка к верху страницы
 */
export const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
};

/**
 * Прокрутка к определённой высоте
 * @param {number} height - высота в пикселях
 */
export const scrollToBlock = (height) => {
  window.scrollTo({ top: height, left: 0, behavior: "smooth" });
};

/**
 * Установка обработчика скролла, если нужен
 * @param {function} callback - функция, вызываемая при скролле
 */
export const setupScrollListener = (callback) => {
  useEffect(() => {
    window.addEventListener("scroll", callback);
    return () => window.removeEventListener("scroll", callback);
  }, []);
};

// import in app and use
// import { scrollToTop, scrollToBlock } from "./utils/scrollHelpers";
// <HeaderScroll
//   texts={texts[language]}
//   language={language}
//   setLanguage={setLanguage}
//   upButton={scrollToTop}
//   toBlock={scrollToBlock}
// />;

// 4️⃣ Использование в других компонентах
// import React from "react";
// import { scrollToBlock, scrollToTop } from "../utils/scrollHelpers";

// function SomeComponent() {
//   return (
//     <div>
//       <button onClick={scrollToTop}>Наверх</button>
//       <button onClick={() => scrollToBlock(1000)}>К блоку</button>
//     </div>
//   );
// }

// export default SomeComponent;
