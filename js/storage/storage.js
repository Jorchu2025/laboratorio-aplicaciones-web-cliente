const STORAGE_KEY = 'cart';

export function initLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
}

export function getFromLocalStorage() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}


export function saveToLocalStorage(item) {
  const cart = getFromLocalStorage();
  cart.push(item);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

export function setItemToLocalStorage(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function updateItemStorage(itemId, qtty) {
  const dataStorage = getFromLocalStorage();
  const idx = dataStorage.findIndex((item) => item.id === itemId);
  if (idx > -1) {
    dataStorage[idx].qtty += qtty;
    setItemToLocalStorage(dataStorage);
  }
  return idx;
}

export function deleteItemStorage(itemId) {
  const dataStorage = getFromLocalStorage();
  const newDataStorage = dataStorage.filter((item) => item.id !== itemId);
  setItemToLocalStorage(newDataStorage);
}