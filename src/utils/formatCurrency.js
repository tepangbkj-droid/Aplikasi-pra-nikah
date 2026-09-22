export function formatIDR(value, { withSign = false } = {}) {
  const n = Number(value) || 0;
  const formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Math.abs(n));

  if (!withSign) return formatted;
  return n < 0 ? `-${formatted}` : `+${formatted}`;
}
