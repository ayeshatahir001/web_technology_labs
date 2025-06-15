// let mongoose = require("mongoose");


// let productSchema = new mongoose.Schema({
// //   title: String,
// //   description: String,
// //   price: Number,
//     imgage:String,


// });

// export default productSchema;

// let ProductModel = mongoose.model("Product", productSchema);

// module.exports = ProductModel;

const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: String,
  price: String,
  image: String,
  description:String
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;




