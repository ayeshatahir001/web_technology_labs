let mongoose = require("mongoose");

let productSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   price: Number,
    img:String


});

let ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;