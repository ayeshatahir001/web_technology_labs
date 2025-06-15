//  // start your server by node server.js
// // or
// // nodemon server
// //if nodemon is not installed install it by running command> npm i nodemon -g



// // let mongoose = require("mongoose");
// // let express = require("express");
// // let expressLayouts = require("express-ejs-layouts");
// // let server = express();

// import express from "express";
// import expressLayouts from 'express-ejs-layouts';
// import mongoose from 'mongoose';
// import productSchema  from "./models/images.model.js";

// const server=express();
// const port =4000;
// // const mongo_URI_women ="mongodb://localhost:27017/women_database";
// // const mongo_URI_men ="mongodb://localhost:27017/men_database";

// const mongoURI_women = "mongodb://localhost:27017/women-database";
// const mongoURI_men = "mongodb://localhost:27017/men-database";

// const womenConnection =  mongoose.createConnection(mongoURI_women);
// const menConnection = mongoose.createConnection(mongoURI_men); 

// const WomenProduct = womenConnection.model("Product",productSchema);

// const MenProduct = menConnection.model("Product",productSchema);




// server.use(express.static("public"));
// server.use(expressLayouts);
// server.set("view engine", "ejs");

// // server.get("/login.html", (req, res) => {
// //   return res.status(404).send("File Not Found");
// //   res.render("homepage");
// // });

// // routes :
// server.get("/cv", (req, res) => {
//   res.render("index",{layout:false});
// });


// server.get("/landingPage",(req,res)=>{
//   res.render("landingPage");

// });


// server.get("/checkout",(req,res)=>{
//   res.render("checkout");


// });

// server.get("/accounts",(req,res)=>{
//   res.render("accounts");


// });

// server.get("/login",(req,res)=>{
//   res.render("login",{layout:true});


// });

// server.get("/register",(req,res)=>{
//   res.render("register");


// });

// server.get("/men", async (req,res)=>{
//     let products = await MenProduct.find();
//     res.render("men", {products});
// });






// // server.get("/landing",async(req, res) => {
// //     // res.render("landingPage");
// //     let Product = require("./models/product.model");
// //     let products = await Product.find();
//     // return res.send(products);
// //      res.render("landingPage",{products});
// // });

// // server.get("/",async(req,res) =>{
// //  let Product = require("./models/product.model");
// //  let products = await Product.find();

//   //res.render("homepage", { products });


// // mongoose.connect("mongodb://localhost:27017/products").then(()=>{
// //  console.log("connected to db");
// // }) for connecting 1 database



// // mongoose.connect("mongodb://localhost:27017/database").then(()=>{
// //   console.log("connected to db");

// // });


// // server.get("/", (req, res) => {
// //   //   res.send("Hello AI Classs");
// //   res.render("homepage");
// // });

// server.listen(4000, () => {
//   console.log("Server Started at localhost:4000");
// })

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const layout = require("express-ejs-layouts");
const checkSession = require("./middleware/checkSession");
const path = require("path");

const app = express();
const port = 4000;

// ========== Middleware Setup ==========
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(layout);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// ========== Session Setup ==========
app.use(
  session({
    secret: "mySuperSecretKey123", // 🔒 Use any strong string here
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  })
);

// app.use(checkSession);

// ========== MongoDB Connection ==========

mongoose
  .connect("mongodb://127.0.0.1:27017/men-database")
  .then(() => console.log("Connected to men-database"))
  .catch((err) => console.log("MongoDB connection error:", err));

// ========== Product Model ==========
const Product =require("./models/product.model")// Make it available in other files

// ========== Routes ==========
const authRoutes = require("./controllers/auth"); // Handles login/register/logout
app.use(authRoutes);

const orderRoutes = require("./controllers/order"); // Add this line at top with other routes
app.use(orderRoutes); 


app.get("/men", async (req, res) => {
  try {
    const products = await Product.find();
    res.render("men", {
      layout:true,
      products,
      cssFile: true,
      css: "Css/men.css", // correct CSS for men page
    });
  } catch (err) {
    res.status(500).send("Error");
  }
});



// ========== Landing Page ==========
app.get("/landingPage",checkSession, (req, res) => {
  res.render("landingPage");
});

app.get("/checkout",(req,res)=>{
  res.render("checkout",{
     layout:true,
     cssFile:true,
     css:"Css/style_checkout.css",


  });


});

app.get("/accounts",(req,res)=>{
  res.render("accounts");
});

app.get("/cv", (req, res) => {
  res.render("index",{layout:false});
});


// ========== Start Server ==========
app.listen(port, () => {
  console.log(`🚀 Server started on http://localhost:${port}`);
});
