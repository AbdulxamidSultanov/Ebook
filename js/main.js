const welcomeText = document.querySelector(".welcomeText");
const welcomeSignIn = document.querySelector(".welcomeText > button");
const signUpBtn = document.querySelector("#signInBtn");
const signIn = document.querySelector('#signIn')
const signUp = document.querySelector('#signUp')


welcomeSignIn.addEventListener("click", function () {
  if (this.textContent === "SIGN UP") {
    welcomeText.classList.remove("slide-right");
    welcomeText.classList.add("slide-left");
    this.textContent = 'SIGN IN'
    signIn.style.opacity = '0%'
    signUp.style.opacity = '100%'
  } else {
    welcomeText.classList.remove("slide-left");
    welcomeText.classList.add("slide-right");
    this.textContent = 'SIGN UP'
    signIn.style.opacity = '100%'
    signUp.style.opacity = '0%'
  }
});
