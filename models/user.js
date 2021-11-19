/*    
  Assignment 2
  Author: Ducarmel Zephyr
  Date: October 23 2021
  Filename: user.js
*/

// importing modules
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, unique: true, required: true },
});

// plugin for passport-local-mongoose
UserSchema.plugin(passportLocalMongoose);

// export userschema
module.exports = mongoose.model("User", UserSchema);
