/*
  Student ID: 301145757 , 301143620 , 301173877 , 301178658 , 301182897 , 300977318
  Web App Name: Runtime
  Description: An Incident Management Application
*/

var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

let incidentController = require('../controllers/incident');

//helper function for guard purposes
function requireAuth(req, res, next) 
{
  //check if the user is logged in
  if(!req.isAuthenticated())
  {
    return res.redirect('/login');
  }
  next();
};

// Router for lists Incident function
router.get('/list', requireAuth, incidentController.incidentList);

// Router for Incident details function
router.get('/details/:id', requireAuth, incidentController.details);

// Routers for edit functions
router.get('/edit/:id', requireAuth, incidentController.displayEditPage);
router.post('/edit/:id', requireAuth, incidentController.processEditPage);

// Routers for audit functions
router.get('/audit/:id', requireAuth, incidentController.displayAudit);

// Router for Delete function
router.get('/delete/:id', requireAuth, incidentController.performDelete);

// Routers for Add functions
router.get('/add', requireAuth, incidentController.displayAddPage);
router.post('/add', requireAuth, incidentController.processAddPage);


module.exports = router;