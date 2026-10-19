const priceFormat = new Intl.NumberFormat("es-UY", {
  style: "currency",
  currency: "UYU",
  maximumFractionDigits: 0,
});

// Quantities move in half steps ("1,5"), so show a comma decimal only when there is one.
export const formatQuantity = (n: number) =>
  new Intl.NumberFormat("es-UY", { maximumFractionDigits: 1 }).format(n);

export const formatPrice = (n: number) => priceFormat.format(n);

// Lowercase and strip accents so "noquis" finds "Ñoquis" and "jamon" finds "Jamón".
export const normalize = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
