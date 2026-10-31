//  src/hooks/useCarusel.js
import { useState, useRef, useEffect } from "react";

const useCarusel = ({ direction }) => {
  const caruselRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const requestIdRef = useRef(null);
  const startPositionRef = useRef(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const closeModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    const carusel = caruselRef.current;

    if (!carusel) return;

    const animate = () => {
      if (isHovered) {
        startPositionRef.current += direction === "left" ? -0.3 : 0.3;

        if (startPositionRef.current >= carusel.scrollWidth / 2) {
          startPositionRef.current = 0;
        } else if (startPositionRef.current <= 0) {
          startPositionRef.current = carusel.scrollWidth / 2;
        }

        carusel.scrollLeft = startPositionRef.current;
      }

      requestIdRef.current = requestAnimationFrame(animate);
    };

    requestIdRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(requestIdRef.current);
  }, [direction, isHovered]);

  return {
    caruselRef,
    isHovered,
    setIsHovered,
    selectedImage,
    setSelectedImage,
    closeModal,
  };
};

export default useCarusel;

// // importAll - allCategories
// import React, { useState, useRef, useEffect } from "react";

// const importAll = (r) => r.keys().map(r);
// const images = importAll(
//   require.context("@/assets/images", false, /\.(png|jpe?g|svg)$/),
// );

// const useCarusel = ({ direction }) => {
//   const caruselRef = useRef(null);
//   const [isHovered, setIsHovered] = useState(false);
//   const requestIdRef = useRef(null);
//   const startPositionRef = useRef(0);
//   const [selectedImage, setSelectedImage] = useState(null);

//   const closeModal = () => {
//     setSelectedImage(null);
//   };

//   useEffect(() => {
//     const carusel = caruselRef.current;

//     const animate = () => {
//       if (isHovered) {
//         startPositionRef.current += direction === "left" ? -0.3 : 0.3;
//         if (startPositionRef.current >= carusel.scrollWidth / 2) {
//           startPositionRef.current = 0;
//         } else if (startPositionRef.current <= 0) {
//           startPositionRef.current = carusel.scrollWidth / 2;
//         }
//         carusel.scrollWidth = startPositionRef.current;
//       }
//       requestIdRef.current = requestAnimationFrame(animate);
//     };
//     requestIdRef.current = requestAnimationFrame(animate);

//     return () => cancelAnimationFrame(requestIdRef.current);
//   }, [direction, isHovered]);
// };

// export default useCarusel;
