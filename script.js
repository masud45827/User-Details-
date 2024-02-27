function display(data) {
  let str = "";
  data.forEach((user) => {
    str += `<a class = "main-contain"><div class="userBlock">`;
    str += `<div class="userData"><b>ID</b>: ${user.id}</div>`;
    str += `<div class="userData"><b>Name</b>: ${user.name}</div>`;
    str += `<div class="userData"><b>Username</b>: ${user.username}</div>`;
    str += `<div class="userData"><b>Email</b>: ${user.email}</div>`;
    str += `<div class="userData"><b>Address:</b></div>`;
    str += `<div class="userData"><b>Street:</b> ${user.address.street}</div>`;
    str += `<div class="userData"><b>Suite:</b> ${user.address.suite}</div>`;
    str += `<div class="userData"><b>City:</b> ${user.address.city}</div>`;
    str += `<div class="userData"><b>Zipcode:</b> ${user.address.zipcode}</div>`;
    str += "</div></a>";
  });
  document.getElementById("demo").innerHTML = str;
}

function toggleButton(btnId) {
  console.log("worked");
  const buttons = document.querySelectorAll(".navbar button");
  console.log(buttons);
  buttons.forEach((button) => {
    if (button.id === btnId) {
      button.classList.add("selected");
    } else {
      button.classList.remove("selected");
    }
  });
}
window.onload = function () {
  callBack();
};

// using callback
const callBack_api = (callback) => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      callback(data);
    });
};

function callBack() {
  clear_data();
  setTimeout(() => {
    callBack_api(function f1(data) {
      display(data);
    });
  }, 800);
}

// using promise
let Api_call = new Promise((resolve, reject) => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      return response.json();
    })
    .then((data) => resolve(data));
});

function proMise() {
  clear_data();
  setTimeout(() => {
    Api_call.then((data) => {
      display(data);
    });
  }, 800);
}

// using async and await
async function getData() {
  let url = await fetch("https://jsonplaceholder.typicode.com/users");
  let data = await url.json();
  return data;
}

async function async_await() {
  clear_data();
  let data = await getData();
  setTimeout(() => {
    display(data);
  }, 800);
}

async function clear_data() {
  document.getElementById("demo").innerHTML = "";
}

// using worker

let w;
function worker_fun() {
  clear_data();
  setTimeout(() => {
    if (typeof Worker !== undefined) {
      if (w === undefined) w = new Worker("worker.js");
      w.onmessage = function (event) {
        display(event.data);
        w = undefined;
      };
    } else {
      alert("your browser does not support worker");
    }
  }, 800);
}
