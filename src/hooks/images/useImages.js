import { useMemo } from "react";

const imageModules = import.meta.glob(
  "/src/assets/images/**/*.{png,jpg,jpeg,svg}",
  {
    eager: true,
    import: "default",
  },
);

export const useImages = (folder) => {
  return useMemo(() => {
    const prefix = `/src/assets/images/${folder}/`;

    return Object.entries(imageModules)
      .filter(([path]) => path.startsWith(prefix))
      .map(([, image]) => image);
  }, [folder]);
};

// Vite import всех картинок
// const imageModules = import.meta.glob(
//   "/src/assets/images/portfolio/banners/*.{png,jpg,jpeg,svg}",
//   {
//     eager: true,
//     import: "default",
//   },
// );

// const imageBanners = Object.values(imageModules);
