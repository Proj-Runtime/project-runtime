const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

module.exports = function () {
  passport.use(
    "local",
    new LocalStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false, {
            message: "Unknown user",
          });
        }

        if (!user.authenticate(password)) {
          return done(null, false, {
            message: "Invalid password",
          });
        }

        return done(null, user);
      });
    })
  );
};

module.exports = passport;

//###############################################
/*
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// A named strategy is used since two local strategy are used :
// one for the registration and the other to sign-in
module.exports = function () {
  passport.use(
    "local",
    new LocalStrategy(
      {
        // Overriding defaults expected parameters,
        // which are 'username' and 'password'
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true, // allows us to pass back the entire request to the callback .
      },
      function (req, email, password, next) {
        // Check in database if user is already registered
        findUserByEmail(email, function (user) {
          // If email already exists, abort registration process and
          // pass 'false' to the callback
          if (user) return next(null, false);
          // Else, we create the user
          else {
            // Password must be hashed !
            let newUser = createUser(email, password);
            newUser.save(function () {
              // Pass the user to the callback
              return next(null, newUser);
            });
          }
        });
      }
    )
  );
};
*/
//##################################################

//module.exports = passport;
