
console.log("Register.js loaded");

const registerForm = document.getElementById("register-form");

if (registerForm) {
  const errorMsg = document.getElementById("error-msg");

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = registerForm.name.value.trim();
    const email = registerForm.email.value.trim();
    const password = registerForm.password.value;
    const confirmPassword = registerForm.confirmPassword.value;

    if (!name || !email || !password || !confirmPassword) {
      errorMsg.textContent = "All fields are required.";
      return;
    }

    if (password !== confirmPassword) {
      errorMsg.textContent = "Passwords do not match.";
      return;
    }

    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = "/landingPage";
      } else {
        errorMsg.textContent = data.message || "Registration failed.";
      }
    } catch (error) {
      console.error("Fetch error:", error);
      errorMsg.textContent = "Something went wrong. Please try again.";
    }
  });
}

