const express = require("express");
const router = express.Router();
const checkSession = require("../middleware/checkSession");
const isAdmin = require("../middleware/isAdmin");

const Complaint = require("../models/complaint.model");
const Order = require("../models/order.model");


router.get("/contact", checkSession, (req, res) => {
  res.render("contact", { user: req.session.user });
});


router.post("/contact", checkSession, async (req, res) => {
  const { orderId, message } = req.body;
  try {
    await Complaint.create({
      userId: req.session.user._id,
      name: req.session.user.name,   
      email: req.session.user.email, 
      orderId,
      message
    });
    res.redirect("/complaint");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error submitting complaint");
  }
});

router.get("/complaint", checkSession, async (req, res) => {
  const complaints = await Complaint.find({ userId: req.session.user._id }).populate("orderId");
  res.render("complaint", { complaints });
});




router.get("/admin/all_complaints", isAdmin, async (req, res) => {
  console.log("Admin complaints route hit ");

  const complaints = await Complaint.find().populate("userId").populate("orderId");
  res.render("all_complaints", { complaints });
});

module.exports = router;

