import { saveToLocalStorage, updateItemStorage } from '../storage/storage.js';

function addToCart(prod) {
  const inputCantidad = document.querySelector(`#contador${prod.id}`);
  const qtty = parseInt(inputCantidad.textContent);

  const idx = updateItemStorage(prod.id, qtty);
  if (idx === -1) {
    prod.qtty = qtty;
    saveToLocalStorage(prod);
  }
}