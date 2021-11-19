var express = require("express");
var router = express.Router();

let incidentController = require("../controllers/incident");

// helper function for guard purposes
function requireAuth(req, res, next) {
  // check if the user is logged in
  if (!req.isAuthenticated()) {
    req.session.url = req.originalUrl;
    return res.redirect("/auth/signin");
  }
  next();
}

// Router for lists Incident function
router.get("/list", requireAuth, incidentController.incidentList);

// Router for Incident details function
router.get("/details/:id", incidentController.details);

// Routers for edit functions
router.get("/edit/:id", requireAuth, incidentController.displayEditPage);
router.post("/edit/:id", incidentController.processEditPage);

// Router for Delete function
router.get("/delete/:id", requireAuth, incidentController.performDelete);

// Routers for Add functions
router.get("/add", requireAuth, incidentController.displayAddPage);
router.post("/add", incidentController.processAddPage);

module.exports = router;
