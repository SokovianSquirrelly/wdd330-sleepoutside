import { findProductById } from "./productData.mjs";
import { cartCount } from "./stores.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

let product = {};

export default async function productDetails(productId, selector) {
  // get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId);
  // once we have the product details we can render out the HTML
  const el = document.querySelector(selector);
  el.insertAdjacentHTML("afterBegin", productDetailsTemplate(product));
  // once the HTML is rendered we can add a listener to Add to Cart button
  document.getElementById("addToCart").addEventListener("click", addToCart);
}

function addToCart() {
  let cartContents = getLocalStorage("so-cart");
  //check to see if there was anything there
  if (!cartContents) {
    cartContents = [];
  }

  // This section checks to see if the product is already in the cart
  // If it is, it increments the quantity by 1 instead of adding the product again
  // Added by: Joshua S - 2021-08-25
  const productId = product.Id;
  // check to see if the product is already in the cart
  const isProductInCart = cartContents.some((item) => item.Id === productId);
  if (isProductInCart) {
    // Product is already in the cart
    // Find the product in the cartContents and increment the quantity by 1
    console.log("Product is already in the cart");
    cartContents = cartContents.map((item) => {
      if (item.Id === productId) {
        item.quantity += 1;
      }
      return item;
    });
  } else {
    // Product is not in the cart
    console.log("Product is not in the cart");
    cartContents.push({ ...product, quantity: 1 });
  }
  // End of addition
  //

  setLocalStorage("so-cart", cartContents);
  // update the visible cartCount
  cartCount.set(cartContents.length);
}

function productDetailsTemplate(product) {
  return `<h3>${product.Brand.Name}</h3>
  <h2 class="divider">${product.NameWithoutBrand}</h2>
  <img
    class="divider"
    src="${product.Images.PrimaryLarge}"
    alt="${product.Name}"
  />
  <p class="product-card__price">$${product.FinalPrice}</p>
  <p class="product__color">${product.Colors[0].ColorName}</p>
  <p class="product__description">
  ${product.DescriptionHtmlSimple}
  </p>
  <div class="product-detail__add">
    <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
  </div>`;
}
