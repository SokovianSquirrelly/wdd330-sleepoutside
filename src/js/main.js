import { loadHeaderFooter, alert } from "./utils.mjs";
import { MainPageAlerts } from "./config";
import { checkLogin } from "./auth.mjs";

checkLogin();

if (MainPageAlerts) {
    alert();
    }
loadHeaderFooter();
