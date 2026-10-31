// src/utils/capitalize.js

// for single word
// export const capitalize = (word) => {
//   if (!word) return "";

//   const str = word.trim();
//   return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
// };

// for words like `New York`
export const capitalize = (str) => {
  if (!str) return "";

  return str
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
