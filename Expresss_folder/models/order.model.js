const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  userEmail: String, // Or use userId if preferred
  productTitle: String,
  quantity: Number,
  totalPrice: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);
