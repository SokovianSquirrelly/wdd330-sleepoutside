import { checkLogin } from "./auth.mjs";
import {requestOrder} from "./externalServices.mjs";

checkLogin();
requestOrder();