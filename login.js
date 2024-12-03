let myFormEl = document.getElementById("myForm");

let nameEl = document.getElementById("name");
let nameErrMsgEl = document.getElementById("nameErrMsg");



let passwordEl = document.getElementById("password");
let passwordErrMsgEl = document.getElementById("passwordErrMsg");

nameEl.addEventListener("blur", function(event) {
  if (event.target.value === "") {
    nameErrMsgEl.textContent = "Required*";
  } else {
    nameErrMsgEl.textContent = "";
  }
});



passwordEl.addEventListener("blur", function(event) {
  if (event.target.value === "") {
    passwordErrMsgEl.textContent = "Required*";
  } else {
    passwordErrMsgEl.textContent = "";
  }
});



myFormEl.addEventListener("submit", function(event) {
  event.preventDefault();
  if (nameEl.value==localStorage.getItem("name") && passwordEl.value==localStorage.getItem("password")){
    window.location.href="About.html"
  }
  else{
    alert("invalid Credentials")
  }
});