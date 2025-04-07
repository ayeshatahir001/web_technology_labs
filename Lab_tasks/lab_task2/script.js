document.getElementById('checkout-form').addEventListener('submit', function(event) {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const cardNumber = document.getElementById('cardNumber').value.trim();
    const expiryValue = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value.trim();
  
    let errors = [];
  
    if (!/^[A-Za-z ]+$/.test(firstName)) errors.push("First name should contain only alphabets.");
    if (!/^[A-Za-z ]+$/.test(lastName)) errors.push("Last name should contain only alphabets.");
    if (!/^\S+@\S+\.\S+$/.test(email)) errors.push("Invalid email format.");
    if (!/^\d{10,15}$/.test(phone)) errors.push("Phone number should be 10 to 15 digits.");
    if (address === "") errors.push("Address cannot be empty.");
    if (!/^\d{16}$/.test(cardNumber)) errors.push("Card number must be 16 digits.");
    if (!/^\d{3}$/.test(cvv)) errors.push("CVV must be exactly 3 digits.");
  
    if (expiryValue) {
      const today = new Date();
      const expiryDate = new Date(expiryValue + "-01");
      if (expiryDate <= today) errors.push("Expiry date must be in the future.");
    } else {
      errors.push("Expiry date is required.");
    }
  
    if (errors.length > 0) {
      event.preventDefault();
      alert(errors.join("\n"));
    } else {
      alert("Form submitted successfully!");
    }
  });
  