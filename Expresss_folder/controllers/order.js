const express = require("express");
const router = express.Router();
const Order = require("../models/order.model");
const checkSession = require("../middleware/checkSession");

// order route 
router.get("/order", checkSession, async (req, res) => {
  try {
    const userEmail = req.session.user?.email;
    if (!userEmail)
       return res.send("No user session found");

    const orders = await Order.find({ email: userEmail });

    res.render("order", {
      layout: true,
      cssFile: true,
      css: "Css/order.css",
      orders,
    });
  } catch (error) {
    console.error(" Error fetching orders:", error);
    res.status(500).send("Server Error");
  }
});

//checkout – Handle order placement
router.post("/checkout", checkSession, async (req, res) => {
  try {
    const { firstname, lastname, phone, address, city, postalcode } = req.body;
    const cart = req.session.cart || [];

    if (cart.length === 0) 
      return res.send("Cart is empty");

    const newOrder = new Order({
      customerName: '${firstname} ${lastname}',
      email: req.session.user.email,
      phone,
      address: '${address}, ${city}, ${postalcode}',
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    });

    await newOrder.save();

    req.session.cart = []; 
    res.redirect("/landingPage"); 
  } catch (err) {
    console.error("Checkout Error:", err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
