const loginForm = document.getElementById("login-form");

if (loginForm) {
  const loginError = document.getElementById("error-msg");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = loginForm.email.value.trim();
    const password = loginForm.password.value.trim();

    if (!email || !password) {
      loginError.textContent = "Both fields are required.";
      return;
    }

    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        window.location.href = "/landingPage";
      } else {
        loginError.textContent = data.message || "Invalid credentials.";
      }
    } catch (error) {
      console.error("Login error:", error);
      loginError.textContent = "Something went wrong. Please try again.";
    }
  });
}
