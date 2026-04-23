document.addEventListener("DOMContentLoaded", (event) => {
  event.preventDefault();

  const productList = document.getElementById("productList");

  const products = data;

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("col");
    productCard.innerHTML = createCard(product);
    productList.append(productCard);
  });
});

function createCard(item) {
  return `<div class="card h-100 product-card">
            <img src="${item.imageUrl}" class="card-img-top" alt="...">
            <div class="d-flex card-body flex-column">
                <h5 class="card-title">${item.title}</h5>
                <p class="card-text d-block">${item.description}</p>
                <a href="#" class="btn btn-danger d-block mt-auto mx-auto">Details</a>
            </div>
        </div>`;
}
