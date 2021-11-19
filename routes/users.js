/*    
  Assignment 2
  Author: Ducarmel Zephyr
  Date: October 23 2021
  Filename: route/user.js
*/

let express = require("express");
let router = express.Router();
let usersController = require("../controllers/user");
let passport = require("../config/passport"); //just modified from /passport

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("users", {
    title: "Users",
    userName: req.user ? req.user.username : "",
  });
});

// Routers for signup functions
router.get("/signup", usersController.renderSignup);
router.post("/signup", usersController.signup);

// Routers for signin functions
router.get("/signin", usersController.renderSignin);
router.post("/signin", usersController.signin);
router.get("/auth/signin", usersController.renderSignin);
router.post("/auth/signin", usersController.signin);

//router.get("/signout", usersController.signout);

module.exports = router;
