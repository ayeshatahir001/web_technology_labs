const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  

  name: { type: String, required: true },
  email: { type: String, required: true },

  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  message: { type: String, required: true },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Complaint", complaintSchema);
