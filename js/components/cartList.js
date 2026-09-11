import {
  deleteItemStorage,
  getFromLocalStorage,
  clearLocalStorage,
} from "../storage/storage.js";
import { toast } from "./toast.js";

export function cartList() {
  const cartListContainer = document.querySelector("#cart-list");
  const clearCartBtn = document.querySelector("#btn-clear-cart");
  let template = "";
  const dataStorage = getFromLocalStorage() || [];

  if (dataStorage.length === 0) {
    cartListContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
    if (clearCartBtn) {
      clearCartBtn.disabled = true;
    }
  } else {
    if (clearCartBtn) {
      clearCartBtn.disabled = false;
    }

    dataStorage.forEach((item) => {
      template += `
        <div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${item.image}" class="img-fluid rounded-start" style="object-fit: contain; height: 150px;" alt="${item.title}">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <p class="card-text">Cantidad: ${item.qtty}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <small class="text-body-secondary">Total: $${(item.price * item.qtty).toFixed(2)}</small>
                  <button class="btn btn-outline-danger border-0" id="delete-item-${item.id}"><i class="bi bi-trash-fill"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    cartListContainer.innerHTML = template;

    dataStorage.forEach((item) => {
      const deleteButton = document.querySelector(`#delete-item-${item.id}`);
      if (deleteButton) {
        deleteButton.addEventListener("click", () => {
          deleteItemStorage(item.id);
          cartList();
        });
      }
    });
  }
}

const clearCartBtn = document.querySelector("#btn-clear-cart");

if (clearCartBtn) {
  clearCartBtn.addEventListener("click", () => {
    clearLocalStorage();
    cartList();
    toast("El carrito ha sido vaciado.");
  });
}
