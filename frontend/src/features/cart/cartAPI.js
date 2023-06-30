// A mock function to mimic making an async request for data
export function addToCart(item) {
  return new Promise(async (resolve) => {
    const respose = await fetch("http://localhost:8000/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await respose.json();
    resolve({ data });
  });
}

export function fetchItemsByUserId() {
  return new Promise(async (resolve) => {
    const respose = await fetch("http://localhost:8000/cart");
    const data = await respose.json();
    resolve({ data });
  });
}

export function updateCart(update) {
  return new Promise(async (resolve) => {
    const respose = await fetch("http://localhost:8000/cart/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await respose.json();
    resolve({ data });
  });
}

export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const respose = await fetch("http://localhost:8000/cart/" + itemId, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    const data = await respose.json();
    resolve({ data });
  });
}

export function resetCart() {
  // first we will have to get all the items from the cart and then delete it
  return new Promise(async (resolve) => {
    let items = await fetchItemsByUserId();
    console.log("items in cartApi", items);
    for (let item of items.data) {
      await deleteItemFromCart(item.id);
    }
    resolve({ status: "success" });
  });
}
