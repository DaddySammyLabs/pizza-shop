import React, { useState, useRef, useEffect, useCallback } from "react";
// useCarousel -> useAutoScrollCarousel
import { useEscapeKey } from "../common/useEscapeKey";

const useAutoScrollCarousel = ({ images, direction = "left" }) => {
  const caruselRef = useRef(null);
  const requestIdRef = useRef(null);
  const startPositionRef = useRef(0);

  const [isPaused, setIsPaused] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const closeModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  useEscapeKey(Boolean(selectedImage), closeModal);

  useEffect(() => {
    const carusel = caruselRef.current;

    if (!carusel || selectedImage || isPaused) return;

    let animationId;

    const animate = () => {
      const maxScroll = carusel.scrollWidth / 2;

      if (maxScroll > 0) {
        startPositionRef.current += direction === "left" ? -0.3 : 0.3;

        if (startPositionRef.current >= maxScroll) {
          startPositionRef.current = 0;
        } else if (startPositionRef.current <= 0) {
          startPositionRef.current = maxScroll;
        }

        carusel.scrollLeft = startPositionRef.current;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [direction, isPaused, selectedImage]);

  return {
    caruselRef,
    isPaused,
    setIsPaused,
    selectedImage,
    setSelectedImage,
    closeModal,
  };
};

export default useAutoScrollCarousel;
