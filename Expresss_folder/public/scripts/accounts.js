
document.addEventListener("DOMContentLoaded", function () {
  // If login button is present, handle click
  const loginBtn = document.querySelector(".login-btn");
  if (loginBtn) {
    loginBtn.addEventListener("click", function () {
      window.location.href = "/login";
    });
  }

  // If register button is present, handle click
  const registerBtn = document.querySelector(".reg-btn");
  if (registerBtn) {
    registerBtn.addEventListener("click", function () {
      window.location.href = "/register";
    });
  }
});
