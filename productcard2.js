document.addEventListener("DOMContentLoaded", (event) => {
  event.preventDefault();

  // 1. Simulated array of Data
  // !! eventually this will be replaced with a fetch request (data from database)
  const products = data;

  // 1.1. Reference the <div> element of id: productList to pupulate the list of products
  const productList = document.getElementById("productList");

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("col");
    productCard.append(createCard(product));
    productList.append(productCard);
  });

  // 2. reference the <div> element of id: productModal and its elements to update the modal's data
  const productModal = document.getElementById("productModal");
  const productModalTitle = document.getElementById("productModalTitle");
  const productModalImage = document.getElementById("productModalImage");
  const productModalDesc = document.getElementById("productModalDesc");

  const spinnerTitle = new Spinner(productModalTitle);
  const spinnerDesc = new Spinner(productModalDesc);

  // Clear everything IMMEDIATELY before the modal even finishes sliding in
  productModal.addEventListener("show.bs.modal", () => {
    productModalTitle.textContent = "";
    productModalDesc.textContent = "";
    productModalImage.src =
      "https://placehold.co/100x100/CCCCCC/FFFFFF?text=Loading Image...";
    if(spinnerTitle.spinner !== null)
        spinnerTitle.displaySpinner(false);
    if(spinnerDesc.spinner !== null)
        spinnerDesc.displaySpinner(false);
  });

  // Show everything after the modal even finishes sliding in
  productModal.addEventListener("shown.bs.modal", async () => {
    productModalImage.src =
      "https://placehold.co/100x100/CCCCCC/FFFFFF?text=Loading Image...";
    spinnerTitle.createSpinner();
    spinnerDesc.createSpinner();
    spinnerTitle.displaySpinner(true);
    spinnerDesc.displaySpinner(true);

    const sleep = (delay) =>
      new Promise((resolve) => setTimeout(resolve, delay));
    await sleep(1000);

    // !! the product id is along the URL
    const params = new URLSearchParams(window.location.search);

    if (params.has("product")) {
      const id = params.get("product");

      // !! eventually this will be replaced with a fetch request (data from database)
      const product = products.find((item) => item.id == id);

      if (product) {
        productModalTitle.textContent = product.title;
        productModalImage.src = product.imageUrl;
        productModalDesc.textContent = product.description;
      }
    }
  });
});

function createCard(item) {
  // 1. Create the card container
  const card = document.createElement("div");
  card.classList.add("card", "h-100", "product-card");

  // 2. Create the Image
  const img = document.createElement("img");
  img.src = item.imageUrl;
  img.classList.add("card-img-top");
  img.alt = item.title;

  // 3. Create the Card Body
  const cardBody = document.createElement("div");
  cardBody.classList.add("d-flex", "card-body", "flex-column");

  // 4. Create the Title
  const title = document.createElement("h5");
  title.classList.add("card-title");
  title.textContent = item.title;

  // 5. Create the Description
  const description = document.createElement("p");
  description.classList.add("card-text", "d-block");
  description.textContent = item.description;

  // 6. Create the Button
  const button = document.createElement("a");
  button.href = "#";
  button.classList.add("btn", "btn-danger", "d-block", "mt-auto", "mx-auto");
  button.setAttribute("data-bs-toggle", "modal");
  button.setAttribute("data-bs-target", "#productModal");
  button.textContent = "Details";

  // 6.1. Add an eventlistener to button
  button.addEventListener("click", (event) => {
    event.preventDefault();

    // Get current URL and search parameters
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    // Set or Append the parameter
    // .set() overwrites existing key; .append() adds even if it exists
    params.set("product", item.id);

    // Update the URL in the address bar
    const newUrl = `${url.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  });

  // 7. Assemble the pieces (Bottom-up)
  cardBody.append(title, description, button);
  card.append(img, cardBody);

  return card;
}
