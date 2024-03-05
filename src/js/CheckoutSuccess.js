import { loadHeaderFooter, alert } from "./utils.mjs";
import { MainPageAlerts } from "./config";
import orderSum from "./components/orderSum.svelte";

if (MainPageAlerts) {
    alert();
    }
loadHeaderFooter();

new orderSum({
    target: document.querySelector(".orderSummery")
  });

