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

module.exports = router;
