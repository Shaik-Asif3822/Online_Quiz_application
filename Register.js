let myFormEl = document.getElementById("myForm");

let nameEl = document.getElementById("name");
// console.log(nameEl.value)
let nameErrMsgEl = document.getElementById("nameErrMsg");

let emailEl=document.getElementById("email");
let emailErrMsgEl=document.getElementById("emailErrMsg")

let passwordEl = document.getElementById("password");
let passwordErrMsgEl = document.getElementById("passwordErrMsg");

let conformpasswordEl = document.getElementById("conformpassword");
let conformpasswordErrMsgEl = document.getElementById("conformpasswordErrMsg");
let btn=document.querySelector('.btn');
nameEl.addEventListener("blur", function(event) {
  if (event.target.value === "") {
    nameErrMsgEl.textContent = "Required*";
  } else {
    nameErrMsgEl.textContent = "";
  }
});
function handleclick(e){
  e.prevent.preventDefault();
  windoew.alert("hello")
}

emailEl.addEventListener("blur", function(event) {
  if (event.target.value === "") {
    emailErrMsgEl.textContent = "Required*";
  } else {
    emailErrMsgEl.textContent = "";
  }
});

passwordEl.addEventListener("blur", function(event) {
  if (event.target.value === "") {
    passwordErrMsgEl.textContent = "Required*";
  } else {
    passwordErrMsgEl.textContent = "";
  }
});

conformpasswordEl.addEventListener("blur", function(event) {
  if (event.target.value === "") {
    conformpasswordErrMsgEl.textContent = "Required*";
  } else {
    conformpasswordErrMsgEl.textContent = "";
  }
});

myFormEl.addEventListener("submit", function(event) {
  event.preventDefault();
  console.log(nameEl.value)
  localStorage.setItem("name",nameEl.value)
  localStorage.setItem("e-mail",emailEl.value)
  localStorage.setItem("password",passwordEl.value)
  window.location.href="login.html";
});