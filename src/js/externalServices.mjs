const baseURL = import.meta.env.VITE_SERVER_URL;
async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    console.log("IT WORKED", res);
    return data;
  } else {
    throw { name: "servicesError", message: data };
  }
}

export async function getProductsByCategory(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const product = await convertToJson(response);
  return product.Result;
}
export async function checkout(payload) {
  console.log("payload of checkout function", payload);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  return await fetch(baseURL + "checkout/", options).then(convertToJson);
}

export async function loginRequest(cred) {
  const res = await fetch("http://server-nodejs.cit.byui.edu:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cred),
  });
  const token = await convertToJson(res);
  return token;
}

export async function requestOrder() {
  const token = getLocalStorage("so-token");
  const response = await fetch("http://server-nodejs.cit.byui.edu:3000/" + "order", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("response", response);
}
