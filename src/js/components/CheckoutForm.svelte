<script>
  import {
    getCartTotal,
    getCartTotalItems,
    getLocalStorage,
    formDataToJSON,
    alertMessage,
    removeAllAlerts,
    setLocalStorage,
  } from "../utils.mjs";
  import { taxRate, baseShipping, additionalIteams } from "/js/config.js";
  import { checkout } from "../externalServices.mjs";

  //props
  export let key = "so-cart";

  let list = [];
  let custFirtName = "";
  let custLastName = "";
  let address = "";
  let cardNumber = "";
  let expirationDate = "";
  let securityCode = "";
  let city = "";
  let state = "";
  let zip = "";

  let subTotal = parseFloat(getCartTotal(key));
  let tax = subTotal * taxRate;
  let total = subTotal + tax + baseShipping;
  let shipping =
    parseFloat(baseShipping) + getCartTotalItems() * additionalIteams;

  const init = function () {
    list = getLocalStorage(key);
  };

  function updateOrderSummary() {
    document.getElementById("order-summary").innerHTML = `
        <p>Item Subtotal(${getCartTotalItems()}): $${subTotal}</p>
        <p>Shipping: $${shipping.toFixed(2)}</p>
        <p>Tax: $${tax.toFixed(2)}</p>
        <p>Total: $${total.toFixed(2)}</p>`;
    setLocalStorage("orderTotal", [total]);
  }
  function clearOrderSummary() {
    document.getElementById("order-summary").innerHTML = `
        <p>Item Subtotal({getCartTotalItems()}): ${subTotal}</p>
        <p>Shipping: $ ----</p>
        <p>Tax: $ ---- </p>
        <p>Total: $ -----</p>`;
  }

  const packageItems = function (items) {
    const simpleItems = items.map((item) => {
      console.log(item);
      return {
        id: item.Id,
        price: item.FinalPrice,
        name: item.Name,
        quantity: item.quantity,
      };
    });
    return simpleItems;
  };

  const handleSubmit = async function () {
    const json = formDataToJSON(this);
    // add totals, and item details
    json.orderDate = new Date();

    json.fname = custFirtName;
    json.lname = custLastName;
    json.street = address;
    json.city = city;
    json.state = state;
    json.zip = zip;
    json.cardNumber = cardNumber;
    json.expiration = expirationDate;
    json.code = securityCode;

    json.orderTotal = total;
    json.tax = tax;
    json.shipping = shipping;
    json.items = packageItems(list);
    try {
      const res = await checkout(json);
      console.log(res);
      // clear the cart
      const order = getLocalStorage("so-cart");
      setLocalStorage("order", order);
      setLocalStorage("so-cart", []);
      // redirect to success page
      location.assign("/checkout/success.html");
    } catch (err) {
      // get rid of any preexisting alerts.
      console.log(err.message);
      removeAllAlerts();
      for (let message in err.message) {
        alertMessage(err.message[message]);
      }
      console.log(err);
    }
  };

  init();
</script>

<form on:submit|preventDefault={handleSubmit}>
  <fieldset class="form-inputs" id="shipping-info">
    <legend>Shipping Information</legend>
    <label for="custFirtName">Customer First Name:</label>
    <input type="text" id="custFirtName" bind:value={custFirtName} required />
    <label for="custLastName">Customer Name:</label>
    <input type="text" id="custLastName" bind:value={custLastName} required />

    <label for="address">Address:</label>
    <input type="text" id="address" bind:value={address} required />
    <label for="city">City:</label>
    <input type="text" id="city" bind:value={city} required />
    <label for="state">State:</label>
    <input type="text" id="state" bind:value={state} required />
    <label for="zip">Zip:</label>
    <input
      type="text"
      id="zip"
      bind:value={zip}
      required
      on:input={() => {
        if (zip.length === 5) {
          updateOrderSummary();
        } else {
          clearOrderSummary();
        }
      }}
    />
    <legend>Payment Information</legend>
    <label for="cardNumber">Credit Card Number:</label>
    <input type="text" id="cardNumber" bind:value={cardNumber} required />

    <label for="expirationDate">Expiration Date:</label>
    <input
      type="text"
      id="expirationDate"
      bind:value={expirationDate}
      required
    />

    <label for="securityCode">Security Code:</label>
    <input type="text" id="securityCode" bind:value={securityCode} required />
  </fieldset>
  <fieldset class="form-block" id="order-summary">
    <legend>Order Summary</legend>
    <p>Item Subtotal({getCartTotalItems()}): ${subTotal}</p>
    <p>Shipping: $ ----</p>
    <p>Tax: $ ----</p>
    <p>Total: $ -----</p>
  </fieldset>

  <button type="submit">Submit</button>
</form>
