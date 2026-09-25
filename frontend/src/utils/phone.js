export function normalizeIndianPhone(phone) {
  if (!phone) return null;
  let digits = String(phone).replace(/\D/g, "");

  if (digits.length === 12 && digits.startsWith("91")) {
    digits = digits.substring(2);
  } else if (digits.length === 11 && digits.startsWith("0")) {
    digits = digits.substring(1);
  }

  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
}

export function isValidIndianPhone(phone) {
  if (!phone) return false;
  return /^[6-9]\d{9}$/.test(String(phone).trim());
}

export function formatPhone(phone) {
  const clean = normalizeIndianPhone(phone);
  if (!clean) return phone || "";
  return `${clean.substring(0, 5)} ${clean.substring(5)}`;
}

export function getInitials(name) {
  if (!name) return "B";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
