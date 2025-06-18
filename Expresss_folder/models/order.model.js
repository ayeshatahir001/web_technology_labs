const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName: String,
  email: String,
  phone: String,
  address: String,
  items: [
    {
      productId: String,
      title: String,
      price: Number,
      quantity: Number,
    }
  ],
  total: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);

