// src/hooks/Resize.js

import { useEffect, useState } from "react";

const Resize = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile;
};

export default Resize;

//useResize
// import useResize from "@/hooks/Resize";

// function Header({ texts, setLanguage }) {
//   const isMobile = useResize();

//   return (
//     <header className="header">
//       {!isMobile ? (
//         <div className="header-inner">{/* desktop */}</div>
//       ) : (
//         <HeaderMobile texts={texts} setLanguage={setLanguage} />
//       )}
//     </header>
//   );
// }
