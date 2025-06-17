



const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");
const isAdmin = require("../middleware/isAdmin");

// ✅ Admin Dashboard – Show form and list of products
router.get("/admin", isAdmin, async (req, res) => {
  const products = await Product.find();
  res.render("admin/admin", {
    layout: false, // No header/footer for admin panel
    cssFile: true,
    css: "CSS/admin.css",
    products,
  });
});

// ✅ Handle Product Add (from same admin page)
router.post("/admin/products/add", isAdmin, async (req, res) => {
  const { title, price, image, description } = req.body;
  await Product.create({ title, price, image, description });
  res.redirect("/admin");
});

// ✅ Handle Edit Product (optional: if editing is implemented)
router.post("/admin/products/edit/:id", isAdmin, async (req, res) => {
  const { title, price, image, description } = req.body;
  await Product.findByIdAndUpdate(req.params.id, {
    title,
    price,
    image,
    description,
  });
  res.redirect("/admin");
});

// ✅ Handle Delete Product
router.post("/admin/products/delete/:id", isAdmin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect("/admin");
});

module.exports = router;


