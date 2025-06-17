

const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: String,
  price: String,
  image: String,
  description:String
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;




