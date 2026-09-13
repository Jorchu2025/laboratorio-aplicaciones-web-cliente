import { initLocalStorage } from './storage/storage.js';
import { cartList } from './components/cartList.js';

initLocalStorage();
cartList();

const btnCarrito = document.getElementById("btn-carrito");
const carrito = document.getElementById("carrito");

btnCarrito.addEventListener("click", () => {
  cartList();
  carrito.showModal();
});

