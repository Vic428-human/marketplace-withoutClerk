export function getStoredValue(key, initialValue) {
  try {
    const data = window.localStorage.getItem(key);
    return data !== null ? JSON.parse(data) : initialValue;
  } catch {
    return initialValue;
  }
}

export function setStoredValue(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}
