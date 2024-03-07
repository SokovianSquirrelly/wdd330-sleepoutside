import { loadHeaderFooter, getParam } from "./utils.mjs";
import LoginForm from "./components/LoginForm.svelte";

const redirect = getParam("redirect");

const loginForm = new LoginForm({
  target: document.querySelector(".login-form"),
});
loadHeaderFooter();
