/*
  Student ID: 301145757 , 301143620 , 301173877 , 301178658 , 301182897 , 300977318
  Web App Name: Runtime
  Description: An Incident Management Application
*/

var express = require('express');
var router = express.Router();

let incidentController = require('../controllers/incident');

// Router for lists Incident function
router.get('/list', incidentController.incidentList);

// Router for Incident details function
router.get('/details/:id', incidentController.details);

// Routers for edit functions
router.get('/edit/:id', incidentController.displayEditPage);
router.post('/edit/:id', incidentController.processEditPage);

// Router for Delete function
router.get('/delete/:id', incidentController.performDelete);

// Routers for Add functions
router.get('/add', incidentController.displayAddPage);
router.post('/add', incidentController.processAddPage);


module.exports = router;