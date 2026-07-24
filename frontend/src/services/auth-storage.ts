const STORAGE_KEY = "liahona.auth";

export function saveSession(data: unknown) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data),
  );
}

export function getSession() {
  const storage = localStorage.getItem(STORAGE_KEY);

  if (!storage) {
    return null;
  }

  return JSON.parse(storage);
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEY);
}

export { STORAGE_KEY };