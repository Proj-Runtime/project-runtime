/*
  Student ID: 301145757 , 301143620 , 301173877 , 301178658 , 301182897 , 300977318
  Web App Name: Runtime
  Description: An Incident Management Application
*/

//var passport = require("passport");

module.exports = function () {
  const User = require("../models/user");

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne(
      {
        _id: id,
      },
      "-password -salt",
      (err, user) => {
        done(err, user);
      }
    );
  });

  require("./local")();
};
