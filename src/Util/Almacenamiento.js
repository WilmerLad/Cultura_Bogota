

export const getStorage = (key) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : null;
};

export const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

