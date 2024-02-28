import ProductList from "./components/ProductList.svelte";
import { loadHeaderFooter, getParam } from "./utils.mjs";
import alerts from "./components/alerts.svelte";

loadHeaderFooter();

const category = getParam("category");

new ProductList({
  target: document.querySelector(".products"),
  props: { category: category },
});
new alerts({
  target: document.querySelector("#alerts"),
});
