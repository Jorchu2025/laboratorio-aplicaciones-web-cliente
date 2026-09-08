import { saveToLocalStorage, updateItemStorage } from '../storage/storage.js';

// Para llamar desde click listener del botón "Agregar al carrito"
function addToCart(prod) {
  const inputCantidad = document.querySelector(`#contador${prod.id}`);
  const qtty = parseInt(inputCantidad.textContent);

  const idx = updateItemStorage(prod.id, qtty);
  if (idx === -1) {
    prod.qtty = qtty;
    saveToLocalStorage(prod);
  }
}