/*
  Student ID: 301145757 , 301143620 , 301173877 , 301178658 , 301182897 , 300977318
  Web App Name: Runtime
  Description: An Incident Management Application
*/

// importing modules
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new Schema({
  firstname: { type: String, unique: false }, //required: true, unique: false },
  lastName: { type: String, unique: false }, //required: true, unique: false },
  email: { type: String, unique: true }, //required: true, unique: true },
  username: { type: String, unique: true }, //unique: true, required: true },
});

// plugin for passport-local-mongoose
UserSchema.plugin(passportLocalMongoose);

// export userschema
module.exports = mongoose.model("User", UserSchema);
