import {
  validateUsername,
  validatePassword,
  validateEmail,
} from "./validate.js";

const welcomeContainer = document.querySelector("#welcomeContainer");
const welcomeSignIn = document.querySelector("#welcomeContainer > button");
const welcomeText = document.querySelector("#welcomeText");
const description = document.querySelector("#description");
const signIn = document.querySelector("#signIn");
const signUp = document.querySelector("#signUp");

welcomeSignIn.addEventListener("click", function () {
  if (this.textContent === "SIGN UP") {
    welcomeContainer.classList.remove("slide-right");
    welcomeContainer.classList.add("slide-left");
    this.textContent = "SIGN IN";
    welcomeText.textContent = "Welcome!";
    description.textContent =
      "To reed electron books with us, please sign up with your personal info";
    signIn.style.opacity = "0%";
    signUp.style.opacity = "100%";
  } else {
    welcomeContainer.classList.remove("slide-left");
    welcomeContainer.classList.add("slide-right");
    this.textContent = "SIGN UP";
    welcomeText.textContent = "Welcome Back!";
    description.textContent =
      "To reed electron books with us, please sign in with your personal info";
    signIn.style.opacity = "100%";
    signUp.style.opacity = "0%";
  }
});

const inForm = document.querySelector("#signInForm");
const username = document.querySelector("#username");
const passIn = document.querySelector("#passIn");

const upForm = document.querySelector("#signUpForm");
const name = document.querySelector("#name");
const emailUp = document.querySelector("#emailUp");
const passUp = document.querySelector("#passUp");
const isName = document.querySelector(".isName");
const isEmail = document.querySelector(".isEmail");
const isPass = document.querySelector(".isPass");

const errorName = document.querySelector(".errorMes");
const errorPass = document.querySelector(".errorPass");

inForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const user = {
    username: username.value,
    password: passIn.value,
  };

  fetch("https://auth-rg69.onrender.com/api/auth/signin", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.status === 404) {
        throw new Error(404);
      }

      if (response.status === 401) {
        throw new Error(401);
      }

      if (response.status === 200) {
        return response.json();
      }
    })
    .then((data) => {
      window.location.assign(`${window.location.origin}/pages/homepage.html`);
    })
    .catch((error) => {
      if (error.message == 404) {
        errorName.style.display = "block";
      } else {
        errorName.style.display = "none";
      }
      if (error.message == 401) {
        errorPass.style.display = "block";
      } else {
        errorPass.style.display = "none";
      }
    });
});

name.addEventListener("input", function () {
  let isValidName = validateUsername(name);
  if (isValidName === true) {
    isName.style.display = "none";
  } else {
    isName.style.display = "block";
  }
});

emailUp.addEventListener("input", function () {
  let isValidEmail = validateEmail(emailUp);
  if (isValidEmail === true) {
    isEmail.style.display = "none";
  } else {
    isEmail.style.display = "block";
  }
});

passUp.addEventListener("input", function () {
  let isValidPass = validatePassword(passUp);
  if (isValidPass === true) {
    isPass.style.display = "none";
  } else {
    isPass.style.display = "block";
  }
});

upForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const user = {
    username: name.value,
    email: emailUp.value,
    password: passUp.value,
  };

  fetch("https://auth-rg69.onrender.com/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then((data) => {
      if (data.message === "User registered successfully!") {
        welcomeContainer.classList.remove("slide-left");
        welcomeContainer.classList.add("slide-right");
        welcomeText.textContent = "Welcome Back!";
        description.textContent =
          "To reed electron books with us, please sign in with your personal info";
        signIn.style.opacity = "100%";
        signUp.style.opacity = "0%";
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
