// src/utils/pxToRem.js

/**
 * Converte i pixel (px) in rem
 * @param {number} px - Il valore in pixel da convertire
 * @param {number} [baseFontSize=16] - La dimensione del font base (default è 16px)
 * @returns {string} - Il valore convertito in rem con l'unità 'rem' inclusa
 */
export const pxToRem = (px, baseFontSize = 16) => {
  if (typeof px !== "number" || typeof baseFontSize !== "number") {
    throw new TypeError("Both px and baseFontSize should be numbers");
  }
  if (baseFontSize <= 0) {
    throw new RangeError("baseFontSize should be a positive non-zero number");
  }
  return `${px / baseFontSize}rem`;
};
