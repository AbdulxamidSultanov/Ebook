function validateUsername(username) {
  if (username.value.trim() === "" || username.value.length < 2) {
    let error = 404;
    return error;
  }
  return true;
}

function validatePassword(pass) {
  let password = pass.value.trim();
  if (
    password.length < 8 ||
    !/[a-zA-z]/.test(password) ||
    !/\d/.test(password) ||
    password.value === ""
  ) {
    let error = 401;
    return error;
  }
  return true;
}

function validateEmail(email) {
  let mail = email.value.trim();
  let valid = mail.includes(".");
  let validate = mail.includes("@");
  if (valid === false || validate === false || mail === "") {
    return false;
  }
  return true;
}

function valideInput(input) {
  input.addEventListener("input", function () {
    if (input.value === "" || input.value.length < 2) {
      input.style.borderColor = "red";
    } else {
      input.style.borderColor = "black";
    }
    return true;
  });
}

function valideYear(input, element = null) {
  input.addEventListener("input", function () {
    if (input.value === "" || input.value.length < 4 || input.value > 2025) {
      input.style.borderColor = "red";
    } else {
      input.style.borderColor = "black";
    }
  });
}
export {
  validatePassword,
  validateUsername,
  validateEmail,
  valideInput,
  valideYear,
};
