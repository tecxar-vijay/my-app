
// to create the order

export function addOrder(order) {
  return new Promise(async (resolve) => {
    const respose = await fetch("http://localhost:8000/orders",{
      method:"POST",
      body : JSON.stringify(order),
      headers : {"content-type":"application/json"}
    });
    const data = await respose.json();
    resolve({ data });
  });
}

export function fetchAllOrders(sort,pagination) {
  let queryString = ""
  for(let key in sort){
    queryString += `${key}=${sort[key]}&`
  }
  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`
  }
  console.log("pagination....",pagination);

  return new Promise(async (resolve) => {
    const respose = await fetch("http://localhost:8000/orders?"+queryString);
    const data = await respose.json();
    const totalOrders = respose.headers.get("X-Total-Count")
    resolve({ data:{orders:data , totalOrders : +totalOrders} });
  });
}

export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const respose = await fetch("http://localhost:8000/orders/"+order.id,{
      method:"PATCH",
      body : JSON.stringify(order),
      headers : {"content-type":"application/json"}
    });
    const data = await respose.json();
    resolve({ data });
  });
}