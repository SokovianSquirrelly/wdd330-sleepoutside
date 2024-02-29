<script>
import { getCartTotal, getCartTotalItems } from "../utils.mjs";
import { taxRate, baseShipping, additionalIteams } from "/js/config.js";

    let customerName = "";
    let address = "";
    let cardNumber = "";
    let expirationDate = "";
    let securityCode = "";
    let city = "";
    let state = "";
    let zip = "";


    let subTotal = parseFloat(getCartTotal());
    let tax = subTotal * taxRate;
    let total = (subTotal + tax + baseShipping);
    let shipping = parseFloat(baseShipping) + (getCartTotalItems() * additionalIteams);

    function handleSubmit() {
        // Stub Handle form submission
    }

    function updateOrderSummary(){
        document.getElementById("order-summary").innerHTML = `
        <p>Item Subtotal({getCartTotalItems()}): ${subTotal}</p>
        <p>Shipping: ${shipping}</p>
        <p>Tax: ${tax.toFixed(2)}</p>
        <p>Total: ${total.toFixed(2)}</p>`;
    }
    function clearOrderSummary(){
        document.getElementById("order-summary").innerHTML = `
        <p>Item Subtotal({getCartTotalItems()}): ${subTotal}</p>
        <p>Shipping: $ ----</p>
        <p>Tax: $ ---- </p>
        <p>Total: $ -----</p>`;
    }
</script>

<form on:submit={handleSubmit}>
    <fieldset class="form-inputs" id="shipping-info">
        <legend>Shipping Information</legend>
    <label for="customerName">Customer Name:</label>
    <input type="text" id="customerName" bind:value={customerName} required>

    <label for="address">Address:</label>
    <input type="text" id="address" bind:value={address} required>
    <label for="city">City:</label>
    <input type="text" id="city" bind:value={city} required>
    <label for="state">State:</label>
    <input type="text" id="state" bind:value={state} required>
    <label for="zip">Zip:</label>
    <input type="text" id="zip" bind:value={zip} required on:input={() => {
        if (zip.length === 5) {
            updateOrderSummary();
        }
        else{
            clearOrderSummary();
        }
    }}>
        <legend>Payment Information</legend>
    <label for="cardNumber">Credit Card Number:</label>
    <input type="text" id="cardNumber" bind:value={cardNumber} required>

    <label for="expirationDate">Expiration Date:</label>
    <input type="text" id="expirationDate" bind:value={expirationDate} required>

    <label for="securityCode">Security Code:</label>
    <input type="text" id="securityCode" bind:value={securityCode} required>
    </fieldset>
    <fieldset class="form-block" id="order-summary">
        <legend>Order Summary</legend>
        <p>Item Subtotal({getCartTotalItems()}): ${subTotal}</p>
        <p>Shipping: $ ----</p>
        <p>Tax: $ ---- </p>
        <p>Total: $ -----</p>
    </fieldset>

    <button type="submit">Submit</button>
</form>