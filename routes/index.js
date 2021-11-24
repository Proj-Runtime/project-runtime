/*
  Student ID: 301145757 , 301143620 , 301173877 , 301178658 , 301182897 , 300977318
  Web App Name: Runtime
  Description: An Incident Management Application
*/

var express = require('express');
var router = express.Router();
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

/* GET to perform UserLogout */
router.get('/logout', controlerIndex.performLogout);

module.exports = router;