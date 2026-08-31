export async function getData() {
  let url = "https://fakestoreapi.com/products";

  try {
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
