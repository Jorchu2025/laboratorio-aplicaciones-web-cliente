import { getData } from "/js/api/api.js";
import { saveToLocalStorage, updateItemStorage } from "../storage/storage.js";
import { addToCart } from "../components/modal.js";
import { addEventListeners, contador } from '../components/contador.js';
import { cartList } from '../components/cartList.js';

let prodContainer = document.getElementById("prod-container");
let products = [];

function renderCards(products) {
  prodContainer.innerHTML = "";

  for (let p of products) {
    prodContainer.innerHTML += `
      <div class="card" style="width: 18rem;">
        <img src="${p.image}" class="card-img-top" alt="${p.title}">
        <div class="card-body">
          <h5 class="card-title">${p.title}</h5>
          <p class="card-text">${p.description}</p>

          <button type="button" class="btn btn-primary btn-agregar">
            Agregar al carrito
          </button>

          <button type="button" class="btn btn-secondary btn-detalle" data-id="${p.id}">
            Ver detalle
          </button>
        </div>
      </div>
    `;
  }

  document.querySelectorAll(".btn-detalle").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = Number(button.dataset.id);
      const product = products.find((p) => p.id === productId);

      const detalle = document.getElementById("detalle");

      document.querySelector(".modal-detalle-imagen").src = product.image;
      document.querySelector(".modal-detalle-imagen").alt = product.title;
      document.querySelector(".modal-detalle-contenido h3").innerText = product.title;
      document.querySelector(".modal-detalle-precio").innerText = `$${product.price}`;
      document.querySelector(".modal-detalle-descripcion").innerText = product.description;

      document.querySelector('#contador-container').innerHTML = contador(product.id);
      addEventListeners(product.id);

      detalle.showModal();

      const agregarModal = document.getElementById("btn-agregar-modal");

agregarModal.onclick = () => {
  addToCart(product);
  detalle.close();
};
    });
  });
}

async function getProducts() {
  products = await getData();
  console.log(products);
  renderCards(products);
}
await getProducts();
document.querySelectorAll(".btn-agregar").forEach((button, index) => {
    button.addEventListener("click", () => {
      const prod = products[index];
      const idx = updateItemStorage(prod.id, 1);
      if (idx === -1) {
        prod.qtty = 1;
        saveToLocalStorage(prod);
      }
      cartList();
    });
});








let searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", function () {
  let query = searchInput.value.toLowerCase();
  let filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
  );
  renderCards(filtered);
});

export { products, renderCards };


