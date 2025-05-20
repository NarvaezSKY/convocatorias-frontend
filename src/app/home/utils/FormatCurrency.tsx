export const formatCurrency = (value: number | string) => {
  const num = typeof value === "string" ? Number(value) : value;
  if (isNaN(num)) return value;
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};