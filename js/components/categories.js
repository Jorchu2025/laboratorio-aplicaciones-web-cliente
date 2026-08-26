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
    <label class="btn btn-secondary" for="${id}">${text}</label>
  `;
}

export async function fetchAndRenderCategories(products, renderCards) {
  const ALL_CATEGORIES = 'todas';

  const categories = await fetch('https://fakestoreapi.com/products/categories')
    .then((res) => res.json());

  const container = document.querySelector('#category-buttons');

  // Primero se renderiza la opción 'Todas' porque es un caso especial,
  // ya que no filtra los productos y se inicializa con el atributo `checked`.
  container.innerHTML += createCategoryButton(ALL_CATEGORIES);
  const allCategoriesButton = document.querySelector(`#${ALL_CATEGORIES}`);
  allCategoriesButton.checked = true;
  allCategoriesButton.addEventListener('click', () => {
    renderCards(products);
  });

  // Se itera sobre las categorías
  // para crear los botones de selección.
  categories.forEach((category) => {
    container.innerHTML += createCategoryButton(category);
  });

  // Es necesaria una nueva iteración para los click listeners,
  // porque de otro modo, el operador += sobre la propiedad innerHTML
  // los destruiría.
  categories.forEach((category) => {
    const categoryButton = document.querySelector(`#${getCategoryId(category)}`);
    categoryButton.addEventListener('click', () => {
      const filteredProducts = products.filter((p) => p.category === category);
      renderCards(filteredProducts);
    });
  });
}