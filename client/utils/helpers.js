export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
    // maximumFractionDigits: 2,
    trailingZeroDisplay: "stripIfInteger",
  }).format(value);
