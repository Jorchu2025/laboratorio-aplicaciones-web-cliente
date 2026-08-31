import { getData } from "/js/api/api.js";

let prodContainer = document.getElementById("prod-container");
let products = [];

function renderCards(products) {
  prodContainer.innerHTML = "";
  for (let p of products) {
    prodContainer.innerHTML += `
      <div class="card" style="width: 18rem;">
        <img src="${p.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${p.title}</h5>
          <p class="card-text">${p.description}</p>
          <a href="#" onclick="detalle.showModal()" class="btn btn-primary">Ver producto</a>
        </div>
      </div>
    `;
  }
}

async function getProducts() {
  products = await getData();
  renderCards(products);
}
getProducts();

export { products, renderCards };

// modal de detalle del producto
let detalle = document.getElementById("detalle");
detalle.addEventListener("showmodal", function (e) {
  let product = e.target.dataset.product;
  let data = JSON.parse(product);
  document.querySelector(".modal-detalle-imagen").src = data.image;
  document.querySelector(".modal-detalle-precio").innerText = data.price;
  document.querySelector(".modal-detalle-descripcion").innerText =
    data.description;
});
