const express = require("express");
const router = express.Router();
const Order = require("../models/order.model");
const isAdmin = require("../middleware/isAdmin");

router.get("/admin/orders", isAdmin, async (req, res) => {
  const orders = await Order.find();
  res.render("admin/adminOrders", { orders });
});

module.exports = router;
