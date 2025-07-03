export function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isValidValidity(val) {
  return Number.isInteger(Number(val)) && Number(val) > 0;
}

export function isValidShortcode(code) {
  return /^[A-Za-z0-9]{4,16}$/.test(code);
} 