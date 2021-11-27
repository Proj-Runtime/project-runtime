/*
  Student ID: 301145757 , 301143620 , 301173877 , 301178658 , 301182897 , 300977318
  Web App Name: Runtime
  Description: An Incident Management Application
*/

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// define User Model instance
let userModel = require('../models/user');
let User = userModel.User;

exports.home = function(req, res, next) {
  res.render('index', { title: 'Home', username: req.user ? req.user.username : '' });
};

// Display the Login page
module.exports.displayLoginPage = (req, res, next) => {
  //check if user is already logged in
  if(!req.user)
  {
    res.render('auth/login',
    {
      title: "login",
      messages: req.flash('loginMessage'),
      username: req.user ? req.user.username : ''
    })
  }
  else
  {
    return res.redirect('/incident/list');
  }
}

// Process the Login page
module.exports.processLoginPage = (req, res, next) => {
  passport.authenticate('local',
  (err, user, info) => {
    // server err
    if(err)
    {
      return next(err);
    }
    // if user login error
    if(!user)
    {
      req.flash('loginMessage', 'Authentication Error');
      return res.redirect('/login');
    }
    req.login(user, (err) => {
      //server error
      if(err)
      {
        return next(err);
      }
      return res.redirect('/incident/list')
    });
  })(req, res, next);    
}

// Display the Register page
module.exports.displayRegisterPage = (req, res, next) => {
  //if user is not logged in
  if(!req.user)
  {
    res.render('auth/register',
    {
      title: 'Register',
      messages: req.flash('registerMessage'),
      username: req.user ? req.user.username : ''
    });
  }
  else
  {
    return res.redirect('/');
  }
}

// Processes the Register page
module.exports.processRegisterPage = (req, res, next) => {
  //instantiate user object
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    userType: req.body.userType
  });

  User.register(newUser, req.body.password, (err) => {
    if (err)
    {
      console.log("Error: Inserting New User");
      if(err.name == "UserExistsError")
      {
        req.flash(
        'registerMessage',
        'Registration Error: User Already Exists!'
        );
        console.log('Error: User Already Exists')
      }
      return res.render('auth/register', 
      {
      title: 'Register',
      messages: req.flash('registerMessage'),
      username: req.user ? req.user.username : ''
      });
    }
    else
    {
      // if no error, registration successful
      return passport.authenticate('local')(req, res, () => {
      //redirect to /login
      res.redirect('/')
      });
    }
  });
}


// Gets user account and renders the modify form using the settings.ejs template
module.exports.displaySettingsPage = (req, res, next) => {
  let id = req.params.id;
  let username = req.params.username;
  let email = req.params.email;
  let userType = req.params.userType;

  User.findById(id, (err, settingsToEdit) => {
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      //show the settings view
      res.render('auth/settings', 
      {
        title: 'Modify User Account', 
        user: settingsToEdit, 
        username: req.user ? req.user.username : ''
      })
    }
  });
}

// Processes the data submitted from the settings form to update a user account
module.exports.processSettingsPage = (req, res, next) => {
  let id = req.params.id

  let updatedSettings = Settings({
    _id: req.body.id,
    username: req.body.username,
    email: req.body.email
  });

  Settings.updateOne({_id: id}, updatedSettings, (err) => {
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      // refresh the Incident list
      res.redirect('/');
    }
  });
}
  

// Performs Logout
module.exports.performLogout = (req, res, next) => {
  req.logout();
  res.redirect('/');
}