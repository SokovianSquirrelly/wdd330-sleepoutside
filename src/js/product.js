import { setLocalStorage, getParam } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import productDetails from "./productDetail.mjs";

const productId = getParam("product");
productDetails(productId, ".product-detail");
console.log(findProductById(productId));

function addProductToCart(product) {
  setLocalStorage("so-cart", product);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
