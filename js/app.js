
import {
    getFromLocalStorage,
    setItemToLocalStorage,
    updateItemStorage,
    deleteItemStorage
} from "./storage/storage.js";

const carrito = document.getElementById("carrito");
const listaCarrito = document.getElementById("lista-carrito");
const carritoVacio = document.getElementById("carrito-vacio");
const carritoTotal = document.getElementById("carrito-total");

function mostrarCarrito() {
    const productosCarrito = getFromLocalStorage();
    

    productosCarrito.forEach((producto) => {
    if (!producto.qtty) {
        producto.qtty = 1;
    }
});
setItemToLocalStorage(productosCarrito);

    listaCarrito.innerHTML = "";

    if (productosCarrito.length === 0) {
        carritoVacio.style.display = "block";
        carritoTotal.innerHTML = "<strong>Total: $0</strong>";
        return;
    }

    carritoVacio.style.display = "none";

    let total = 0;

    productosCarrito.forEach((producto) => {
        total += producto.price * producto.qtty;

        const div = document.createElement("div");
       div.classList.add("item-carrito");

        div.innerHTML = `
    <p>
        <strong>${producto.title}</strong>
        - $${producto.price}
    </p>

    <div class="controles-carrito">
        <button type="button" class="btn-restar">−</button>
        <span>${producto.qtty}</span>
        <button type="button" class="btn-sumar">+</button>
        <button type="button" class="btn-eliminar">Eliminar</button>
    </div>
`;


        listaCarrito.appendChild(div);

    div.querySelector(".btn-sumar").addEventListener("click", () => {
    updateItemStorage(producto.id, 1);
    mostrarCarrito();
});


div.querySelector(".btn-restar").addEventListener("click", () => {
    if (producto.qtty > 1) {
        updateItemStorage(producto.id, -1);
        mostrarCarrito();
    }
});

div.querySelector(".btn-eliminar").addEventListener("click", () => {
    deleteItemStorage(producto.id);
    mostrarCarrito();
});

});

    carritoTotal.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
}

const btnCarrito = document.getElementById("btn-carrito");

if (btnCarrito) {
   btnCarrito.addEventListener("click", () => {
    mostrarCarrito();
    carrito.showModal();
});


} else {
    alert("NO ENCUENTRO EL BOTÓN");
}




