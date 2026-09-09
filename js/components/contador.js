export function contador(id) {
  const template = `
    <div class="d-flex justify-content-center align-items-center gap-3 my-3">
    <button id="btn-decrement-${id}" class="btn btn-dark">-</button>
    <span id="contador-${id}"></span>
    <button id="btn-increment-${id}" class="btn btn-dark">+</button>
    </div>
  `;

  return template;
}

export function addEventListeners(id, initialQtty = 1) {
  const decrementButton = document.querySelector(`#btn-decrement-${id}`);
  const incrementButton = document.querySelector(`#btn-increment-${id}`);
  const contador = document.querySelector(`#contador-${id}`);

  contador.innerHTML = initialQtty;
  if (contador.innerHTML === "1") {
    decrementButton.disabled = true;
  }

  decrementButton.addEventListener("click", () => {
    contador.innerHTML = parseInt(contador.innerHTML) - 1;
    if (parseInt(contador.innerHTML) === 1) {
      decrementButton.disabled = true;
    }
  });

  incrementButton.addEventListener("click", () => {
    if (parseInt(contador.innerHTML) === 1) {
      decrementButton.disabled = false;
    }
    contador.innerHTML = parseInt(contador.innerHTML) + 1;
  });
}