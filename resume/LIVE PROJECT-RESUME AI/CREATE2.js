document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("createAccountForm");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");

  form.addEventListener("submit", function (e) {
    // Clear previous errors
    clearErrors();

    // Validate password match
    if (password.value !== confirmPassword.value) {
      e.preventDefault();
      showError(confirmPassword, "Passwords do not match.");
      confirmPassword.focus();
      return false;
    }

    // Additional validations can be added here (e.g. mobile format, etc.)
  });

  function showError(inputElement, message) {
    let errorElem = document.createElement("div");
    errorElem.className = "error-message";
    errorElem.textContent = message;
    inputElement.parentNode.appendChild(errorElem);
    inputElement.style.borderColor = "red";
  }

  function clearErrors() {
    const errors = document.querySelectorAll(".error-message");
    errors.forEach((el) => el.remove());
    password.style.borderColor = "";
    confirmPassword.style.borderColor = "";
  }
});
