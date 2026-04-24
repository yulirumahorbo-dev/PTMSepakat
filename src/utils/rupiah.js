// Format number to Rupiah string: 10000000 -> "Rp 10.000.000"
export function formatRupiah(value) {
  if (!value && value !== 0) return "-";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
}

// Format raw digits to display string with dots: "10000000" -> "10.000.000"
export function formatInputDisplay(raw) {
  if (!raw) return "";
  const digits = raw.replace(/\D/g, "");
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
