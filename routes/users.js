/*
  Student ID: 301145757 , 301143620 , 301173877 , 301178658 , 301182897 , 300977318
  Web App Name: Runtime
  Description: An Incident Management Application
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
router.post("/signin", usersController.signin);

//router.get("/signout", usersController.signout);

module.exports = router;