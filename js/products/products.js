import { getData } from "/js/api/api.js";
import { saveToLocalStorage } from "../storage/storage.js";

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

      detalle.showModal();

      const agregarModal = document.getElementById("btn-agregar-modal");

agregarModal.onclick = () => {
  saveToLocalStorage(product);
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
        saveToLocalStorage(products[index]);
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


