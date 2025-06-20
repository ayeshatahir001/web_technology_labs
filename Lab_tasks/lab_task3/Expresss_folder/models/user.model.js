const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
name:String,
email:String,
password:String,
role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

});

const User = mongoose.model("User",userSchema);
module.exports=User;