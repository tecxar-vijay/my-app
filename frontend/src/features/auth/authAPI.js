export function createUser(userData) {
  return new Promise(async (resolve,reject) => {          //   /user
    const response = await fetch("http://localhost:8000/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    try {
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      }else{
        const error = await response.json()
        reject(error)
      }
    } catch (error) {
      reject(error)
    }
  });
}
// export function createUser(userData) {
//   return new Promise(async (resolve) => {          //   /user
//     const response = await fetch("http://localhost:8000/auth/signup", {
//       method: "POST",
//       body: JSON.stringify(userData),
//       headers: { "content-type": "application/json" },
//     });
//     const data = await response.json();
//     resolve({ data });
//   });
// }

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    // const email = loginInfo.email;
    // const password = loginInfo.password;
    try {
      const response = await fetch(`http://localhost:8000/auth/login`,{
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({data })
      }else{
        const error = await response.json()
        reject(error)
      }
    } catch (error) {
      reject(error)
    }
    // console.log(data);
    // here we are checking the password in front end just because of testing we never test user in frontend
    // if (data.length) {
    //   if (password === data[0].password) {
    //     resolve({ data: data[0] });
    //   } else {
    //     reject({ message: "Wrong credential" });
    //   }
    // } else {
    //   reject({ message: "user not found" });
    // }
  });
}

export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/http://localhost:8000/users", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function signOut(userId) {
  return new Promise(async (resolve, reject) => {
    resolve({ data: "success" });
  });
}
