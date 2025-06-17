const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

// ========== GET: Register Page ==========
router.get("/register", (req, res) => {
  return res.render("register", {
    layout: false,
    cssFile: true,
    css: "Css/register.css",
    jsFile: true,
    js: "scripts/register.js",
  });
});

// ========== POST: Register User ==========
router.post("/register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: email === "admin@gmail.com" ? "admin" : "user"  // 👈 Auto-assign role
    });

    await newUser.save();

    return res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Something went wrong. Please try again." });
  }
});

// ========== GET: Login Page ==========
router.get("/login", (req, res) => {
  return res.render("login", {
    layout: false,
    cssFile: true,
    css: "css/login.css",
    jsFile: true,
    js: "scripts/register.js",
  });
});

// ========== POST: Login User ==========
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found. Please register." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,  // 👈 Ensure this is saved in session
    };

    return res.redirect("/");
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Server Error" });
  }
});

// ========== GET: Landing Page ==========
router.get("/", (req, res) => {
  return res.render("landingPage", {
    layout: true,
    cssFile: true,
    css: "css/login.css",
    jsFile: true,
    js: "scripts/register.js",
  });
});

// ========== GET: Logout ==========
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

module.exports = router;
