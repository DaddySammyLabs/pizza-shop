import { useState } from "react";
import { useEscapeKey } from "../common/useEscapeKey";

export function useImageGallery(
  images,
  { initialRows = 2, imagesPerRow = 3, rowsStep = 2 } = {},
) {
  const [visibleRows, setVisibleRows] = useState(initialRows);
  const [selectedImage, setSelectedImage] = useState(null);

  const visibleCount = visibleRows * imagesPerRow;
  const visibleImages = images.slice(0, visibleCount);
  const hasMore = visibleCount < images.length;

  const showMore = () => {
    setVisibleRows((prev) => prev + rowsStep);
  };

  const openImage = (image) => {
    setSelectedImage(image);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  useEscapeKey(Boolean(selectedImage), closeImage);

  return {
    visibleImages,
    visibleCount,
    hasMore,
    selectedImage,
    showMore,
    openImage,
    closeImage,
  };
}

// const [visibleRows, setVisibleRows] = useState(2);
// const [selectedImage, setSelectedImage] = useState(null);

// const imagesPerRow = 4;

// const visibleCount = visibleRows * imagesPerRow;
// const visibleImages = images.slice(0, visibleCount);

// const showMoreImages = () => {
//   setVisibleRows((prev) => prev + 2);
// };

// const closeModal = () => {
//   setSelectedImage(null);
// };
