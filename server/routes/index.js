/*
  Student ID: 301145757 , 301143620 , 301173877 , 301178658 , 301182897 , 300977318
  Web App Name: Runtime
  Description: An Incident Management Application
*/

var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');
let controlerIndex = require('../controllers/index');

/* GET home page. */
router.get('/', controlerIndex.home);

/* GET Route for displaying Login page */
router.get('/login', controlerIndex.displayLoginPage);

/* POST Route for processing Login page */
router.post('/login', controlerIndex.processLoginPage);

/* GET Route for displaying Register page */
router.get('/register', controlerIndex.displayRegisterPage);

/* POST Route for processing Register page */
router.post('/register', controlerIndex.processRegisterPage);

/* GET Route for displaying Settings page */
router.get('/settings', controlerIndex.displaySettingsPage);

/* POST Route for processing Settings page */
router.post('/settings/:id', controlerIndex.processSettingsPage);

// // Router for Delete function
// router.get('/delete/:id', controlerIndex.performDeleteAccount);

/* GET to perform UserLogout */
router.get('/logout', controlerIndex.performLogout);

module.exports = router;
