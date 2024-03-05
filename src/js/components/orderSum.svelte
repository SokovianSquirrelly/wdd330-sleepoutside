<script>
import { getLocalStorage, removeLocalStorage, getCartTotal } from "../utils.mjs";

let cartItems = getLocalStorage("order");

const data = getCartTotal("orderTotal");
const total = data[0];
const stringyTotal = total.toString();
</script>


<ul class="product-list">
    {#each cartItems as item}
        <li class="cart-card divider">
            <a href="/product_pages/index.html?product={item.Id}">
                <h2 class="card__name">{item.Name}</h2>
            </a>
            <p class="cart-card__color">{item.Colors[0].ColorName}</p>

            <p>{item.quantity}</p>

            <p class="cart-card__price">${item.FinalPrice}</p>
        </li>
    {/each}
    <li class="cart-card divider">
        <h2 class="cart-card__total">
            Total: ${stringyTotal}
        </h2>
    </li>
</ul>
