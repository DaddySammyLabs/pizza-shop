// src/scripts/headerScroll.js
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  const scrollPosition = window.scrollY;
  const screenHeight = window.innerHeight;

  if (scrollPosition > screenHeight * 0.2) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// for buttons
// Отслеживание скролла
// useEffect(() => {
//   const handleScroll = () => {
//     const header = document.querySelector(".header");
//     const scrollPosition = window.scrollY;
//     const screenHeight = window.innerHeight;

//     if (scrollPosition > screenHeight * 0.2) {
//       header.classList.add("scrolled");
//     } else {
//       header.classList.remove("scrolled");
//     }
//   };

//   window.addEventListener("scroll", handleScroll);

//   // Очистка при размонтировании
//   return () => {
//     window.removeEventListener("scroll", handleScroll);
//   };
// }, []);

//
//
// styles.css for scroll-tracker
// .header {
//   width: 100%;
//   position: sticky;
//   backdrop-filter: blur(8px);
//   transition: background-color 0.3s ease;
//   z-index: 10;
//   top: 0;
// }
// .header-inner {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   width: 90%;
//   margin: 0 auto;
//   backdrop-filter: blur(8px);
//   transition: background-color 0.3s ease;
//   z-index: 10;
//   top: 0;
// }
// .header.scrolled {
//   background-color: #1212127e;
// }
