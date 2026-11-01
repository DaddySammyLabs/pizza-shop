import { useState, useEffect, useMemo } from "react";

export default function useReviewsCarousel(visible = 3) {
  const [reviewsData, setReviewsData] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/reviews.json");
        if (!response.ok) throw new Error("Ошибка загрузки отзывов");

        const data = await response.json();
        setReviewsData(data.reviews);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const next = () => {
    if (!reviewsData.length) return;
    setIndex((prev) => (prev + 1) % reviewsData.length);
  };

  const prev = () => {
    if (!reviewsData.length) return;
    setIndex((prev) => (prev === 0 ? reviewsData.length - 1 : prev - 1));
  };

  const visibleReviews = useMemo(() => {
    if (!reviewsData.length) return [];
    return Array.from(
      { length: Math.min(visible, reviewsData.length) },
      (_, i) => reviewsData[(index + i) % reviewsData.length],
    );
  }, [reviewsData, index, visible]);

  return { reviewsData, visibleReviews, loading, next, prev };
}

//
// for smooth carusel
// import { useState, useEffect } from "react";

// export default function useReviewsCarousel() {
//   const [reviewsData, setReviewsData] = useState([]);
//   const [index, setIndex] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await fetch("/reviews.json");
//         const data = await response.json();
//         setReviewsData(data.reviews);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReviews();
//   }, []);

//   const next = () => {
//     setIndex((prev) => prev + 1);
//   };

//   const prev = () => {
//     setIndex((prev) => prev - 1);
//   };

//   return { reviewsData, index, loading, next, prev };
// }
