const form = document.getElementById("checkoutForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const fields = [
    "firstname",
    "lastname",
    "email",
    "phone",
    "address",
    "city",
    "zipcode",
    "postal",
    "cardno",
    "cvv",
    "expiry",
  ];

  let valid = true;
  clearErrors();

  fields.forEach((id) => {
    const input = document.getElementById(id);
    const value = input.value.trim();
    const error = input.parentElement.querySelector(".error-message");

    if (value === "") {
      showError(input, "This field is required");
      valid = false;
    } else {
      if (id === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
        showError(input, "Invalid email");
        valid = false;
      } else if (
        (id === "firstname" || id === "lastname" || id === "city") &&
        !/^[A-Za-z ]+$/.test(value)
      ) {
        showError(input, "Only letters allowed");
        valid = false;
      } else if (
        (id === "zipcode" || id === "postal") &&
        !/^\d{4,6}$/.test(value)
      ) {
        showError(input, "Enter 4-6 digit number");
        valid = false;
      } else if (id === "phone" && !/^\d{11}$/.test(value)) {
        showError(input, "Phone must be 11 digits");
        valid = false;
      } else if (id === "cardno" && !/^\d{16}$/.test(value)) {
        showError(input, "Card must be 16 digits");
        valid = false;
      } else if (id === "cvv" && !/^\d{3}$/.test(value)) {
        showError(input, "CVV must be 3 digits");
        valid = false;
      } else if (id === "expiry") {
        const today = new Date();
        const exp = new Date(value + "-01");
        if (exp <= today) {
          showError(input, "Expiry must be in future");
          valid = false;
        }
      }
    }
  });

  const success = document.getElementById("success-message");
  const submitBtn = form.querySelector("button");

  if (valid) {
  success.textContent = "Your order has been completed";
  submitBtn.classList.add("success");

  setTimeout(() => {
    form.submit(); // Actually send to backend now
  }, 1000);
}


});

function showError(input, message) {
  const error = input.parentElement.querySelector(".error-message");
  error.textContent = message;
  input.style.borderColor = "red";
}

function clearErrors() {
  document
    .querySelectorAll(".error-message")
    .forEach((el) => (el.textContent = ""));
  document
    .querySelectorAll("input")
    .forEach((input) => (input.style.borderColor = "#ccc"));
}
