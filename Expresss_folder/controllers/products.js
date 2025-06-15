const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");
const isAdmin = require("../middleware/isAdmin");

// Admin Dashboard
router.get("/admin", isAdmin, (req, res) => {
  res.render("admin/admin", {
    layout: true,
    cssFile: true,
    css: "CSS/admin.css"
  });
});

// Show all products
router.get("/admin/products", isAdmin, async (req, res) => {
  const products = await Product.find();
  res.render("admin/listProducts", { products });
});

// Add product form
router.get("/admin/products/add", isAdmin, (req, res) => {
  res.render("admin/addProduct");
});

// Handle product add
router.post("/admin/products/add", isAdmin, async (req, res) => {
  const { title, price, image, description } = req.body;
  await Product.create({ title, price, image, description });
  res.redirect("/admin/products");
});

// Edit form
router.get("/admin/products/edit/:id", isAdmin, async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render("admin/editProduct", { product });
});

// Handle edit
router.post("/admin/products/edit/:id", isAdmin, async (req, res) => {
  const { title, price, image, description } = req.body;
  await Product.findByIdAndUpdate(req.params.id, { title, price, image, description });
  res.redirect("/admin/products");
});

// Delete
router.post("/admin/products/delete/:id", isAdmin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect("/admin/products");
});

module.exports = router;
