import { getData } from "/js/api/api.js";

let prodContainer = document.getElementById("prod-container");

async function getProducts() {
  let data = await getData();
  for (let d of data) {
    prodContainer.innerHTML += `
      <div class="card" style="width: 18rem;">
        <img src="${d.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${d.title}</h5>
          <p class="card-text">${d.description}</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    `;
  }
}

getProducts();
