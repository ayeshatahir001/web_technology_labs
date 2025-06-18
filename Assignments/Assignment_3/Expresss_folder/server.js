
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
    secret: "mySuperSecretKey123", 
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60, 
    },
  })
);


app.use((req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = [];  
  }
  next();
});


mongoose
  .connect("mongodb://127.0.0.1:27017/men-database")
  .then(() => 
    console.log("Connected to men-database"))
  .catch((err) => 
    console.log("MongoDB connection error:", err));


const Product =require("./models/product.model");
const authRoutes = require("./controllers/auth"); 
app.use(authRoutes);

const orderRoutes = require("./controllers/order"); // Add this line at top with other routes
app.use(orderRoutes); 

const adminProductRoutes = require("./controllers/products");
app.use(adminProductRoutes);

const cartRoutes = require("./controllers/cart");
app.use(cartRoutes);


const complaintRoutes = require("./controllers/complaint");
app.use(complaintRoutes);




app.get("/men", async (req, res) => {
  try {
    const products = await Product.find();
    res.render("men", {
      layout:true,
      products,
      cssFile: true,
      css: "Css/men.css", 
    });
  } catch (err) {
    res.status(500).send("Error");
  }
});

app.get("/landingPage",(req, res) => {
  res.render("landingPage");
});

app.get("/checkout",(req,res)=>{
  res.render("checkout",{
     layout:true,
     cssFile:true,
     css:"Css/style_checkout.css",

  });

});

app.get("/cv", (req, res) => {
  res.render("index",{layout:false});
});

// app.get("/contact",(req,res) =>{
//   res.render("contact",{
//      layout:true,
//      cssFile:true,
//      css:"Css/contact.css",
//   });
//  });


app.listen(port, () => {
  console.log("Server started on localHost:4000");
});
