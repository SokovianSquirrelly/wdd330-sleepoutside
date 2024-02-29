<script>
  import { getLocalStorage, removeLocalStorage, getCartTotal } from "../utils.mjs";
  let cartItems = getLocalStorage("so-cart");
  if (!cartItems) {
    cartItems = [];
  }
  // Function to handle the change in quantity of a product and remove it from the cart if the quantity is set to 0
  // Added by: Joshua S - 2021-08-25
  function handleQuantityChange(event) {
    let selectedQuantity = parseInt(event.target.value, 10);
    let productId = event.target.parentElement
      .querySelector(".cart-card__image")
      .href.split("=")[1];
    if (selectedQuantity === 0) {
      let newCartItems = cartItems.filter((item) => item.Id !== productId);
      removeLocalStorage("so-cart");
      localStorage.setItem("so-cart", JSON.stringify(newCartItems));
    } else {
      let product = cartItems.find((item) => item.Id === productId);
      product.quantity = selectedQuantity;
      let newCartItems = cartItems.map((item) =>
        item.Id === productId ? product : item,
      );
      removeLocalStorage("so-cart");
      localStorage.setItem("so-cart", JSON.stringify(newCartItems));
    }
    location.reload();
    console.log(`New quantity selected: ${selectedQuantity}`);
  }
</script>

<h2>My Cart</h2>

<ul class="product-list">
  {#each cartItems as item}
    <li class="cart-card divider">
      <a
        href="/product_pages/index.html?product={item.Id}"
        class="cart-card__image"
      >
        <img src={item.Images.PrimaryMedium} alt={item.Name} />
      </a>
      <a href="/product_pages/index.html?product={item.Id}">
        <h2 class="card__name">{item.Name}</h2>
      </a>
      <p class="cart-card__color">{item.Colors[0].ColorName}</p>

      <select
        name="quantity"
        id="quantity"
        class="cart-card__quantity"
        on:change={handleQuantityChange}
      >
        <option value="0">0</option>
        {#each Array.from({ length: item.quantity + 5 }, (_, i) => i + 1) as number}
          <option value={number} selected={number === item.quantity}>
            {number}
          </option>
        {/each}
      </select>

      <p class="cart-card__price">${item.FinalPrice}</p>
    </li>
  {/each}
  <li class="cart-card divider">
    <h2 class="cart-card__total">
      Total: ${getCartTotal()}
    </h2>
    <button id="checkout-button"><a href="/checkout/">Checkout</a></button>
  </li>
</ul>

