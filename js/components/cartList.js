import { deleteItemStorage, getFromLocalStorage } from '../storage/storage.js';

export function cartList() {
  const cartListContainer = document.querySelector('#cart-list');
  let template = '';
  const dataStorage = getFromLocalStorage();

  if (dataStorage.length === 0) {
    cartListContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
  } else {
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
                  <small class="text-body-secondary">Precio: $${item.price.toFixed(2)}</small>
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
      deleteButton.addEventListener('click', () => {
        deleteItemStorage(item.id);
        cartList();
      });
    });
  }
}