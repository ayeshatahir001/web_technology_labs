// const mongoose = require("mongoose");

// const orderSchema = mongoose.Schema({
//   userEmail: String, // Or use userId if preferred
//   productTitle: String,
//   quantity: Number,
//   totalPrice: Number,
//   date: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model("Order", orderSchema);
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
  status: {
    type: String,
    default: "Pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);

