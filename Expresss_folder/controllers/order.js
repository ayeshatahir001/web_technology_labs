const express = require("express");
const router = express.Router();
const Order = require("../models/order.model");
const checkSession = require("../middleware/checkSession");




router.get("/order", checkSession, async (req, res) => {
  try {
    const userEmail = req.session.user.email;
    const orders = await Order.find({ userEmail });

    res.render("order", {
      layout: true,
      orders,
      cssFile: true,
      css: "Css/order.css" // Optional
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send("Server Error");
  }
});

router.post("/checkout", async (req, res) => {
  const { firstname, lastname, email, phone, address, city, zipcode, postal } = req.body;
  const cart = req.session.cart;

  if (!cart || cart.length === 0) {
    return res.send("Cart is empty");
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  await Order.create({
    customerName: `${firstname} ${lastname}`,
    email,
    phone,
    address: `${address}, ${city}, ${zipcode}, ${postal}`,
    items: cart,
    total,
    status: "Pending",
    createdAt: new Date()
  });

  req.session.cart = []; // Clear cart after order
  //res.send("✅ Order placed successfully!");
  res.redirect("/landingPage");
});

module.exports = router;



