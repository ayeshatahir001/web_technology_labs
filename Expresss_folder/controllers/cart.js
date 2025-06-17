const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");
const checkSession = require("../middleware/checkSession");

router.post("/add-to-cart/:id",checkSession, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);

  if (!product) return res.redirect("/");

  if (!req.session.cart) req.session.cart = [];

  const cart = req.session.cart;

  const existingItem = cart.find(item => item.productId == productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      title: product.title,
      price: product.price,
      quantity: 1,
    });
  }

  res.redirect("/cart");
});

// view cart page

router.get("/cart", (req, res) => {
  const cart = req.session.cart || [];
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  res.render("cart", {
    cart,
    total,
    layout: true,
    cssFile: true,
    css: "CSS/cart.css"
  });
});


//remvoe item
router.post("/cart/remove/:id", (req, res) => {
  req.session.cart = req.session.cart.filter(item => item.productId !== req.params.id);

  res.redirect("/cart");
});

// Show Cart Data on Checkout Page (/checkout)
router.get("/checkout", (req, res) => {
  const cart = req.session.cart || [];
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
 res.render("checkout", {
  layout: true,
  cart,
  total,
  cssFile: true,
  css: "CSS/style_checkout.css"
});

});


module.exports = router;
