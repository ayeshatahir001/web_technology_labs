const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");
const checkSession = require("../middleware/checkSession");

router.post("/add-to-cart/:id",checkSession, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);

  if (!product) 
    return res.redirect("/");

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

// Increase quantity
router.post("/cart/increase/:id", (req, res) => {
  const cart = req.session.cart || [];
  const item = cart.find(i => i.productId === req.params.id);
  if (item) item.quantity += 1;
  res.redirect("/cart");
});

// Decrease quantity
router.post("/cart/decrease/:id", (req, res) => {
  const cart = req.session.cart || [];
  const item = cart.find(i => i.productId === req.params.id);
  if (item) {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      // If quantity is 1, remove it
      req.session.cart = cart.filter(i => i.productId !== req.params.id);
    }
  }
  res.redirect("/cart");
});



//remvoe item
router.post("/cart/remove/:id", (req, res) => {
req.session.cart = req.session.cart.filter(item => item.productId !== req.params.id);
req.session.message = "Cart is empty";
return res.redirect("/men");

});

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
