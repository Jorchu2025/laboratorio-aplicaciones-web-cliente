import { products, renderCards } from '../products/products.js';

function getCategoryId(category) {
  return category
    .replaceAll(' ', '-')
    .replaceAll("'", "");
}

function createCategoryButton(category) {
  const id = getCategoryId(category);
  const text = category.charAt(0).toUpperCase() + category.slice(1); // Capitaliza la primera letra

  return `
    <input type="radio" class="btn-check" name="categories" id="${id}" autocomplete="off">
    <label class="btn btn-secondary category" for="${id}">${text}</label>
  `;
}

export async function fetchAndRenderCategories(products, renderCards) {
  const ALL_CATEGORIES = 'todas';

  // La opción 'Todas' no es parte del array de categorias
  // porque es un caso especial,
  // ya que no filtra los productos y se inicializa con el atributo `checked`.
  const categories = await fetch('https://fakestoreapi.com/products/categories')
    .then((res) => res.json());

  const container = document.querySelector('#category-buttons');

  container.innerHTML += createCategoryButton(ALL_CATEGORIES);

  categories.forEach((category) => {
    container.innerHTML += createCategoryButton(category);
  });
  
  const allCategoriesButton = document.querySelector(`#${ALL_CATEGORIES}`);
  allCategoriesButton.setAttribute('checked', 'checked');
  allCategoriesButton.addEventListener('click', () => {
    renderCards(products);
  });

  categories.forEach((category) => {
    const id = getCategoryId(category);
    const categoryButton = document.querySelector(`#${id}`);
    categoryButton.addEventListener('click', () => {
      const filteredProducts = products.filter((p) => p.category === category);
      renderCards(filteredProducts);
    });
  });
}

fetchAndRenderCategories(products, renderCards);