
let mongoose = require('mongoose');

// Create a model class
let incidentModel = mongoose.Schema(
    {
        Description: String,
        Priority: String,
        Narrative: String,
        RequesterName: String,
        Technician: String,
        Status: String,
        CreatedDate: String
    },
    {
        collection: "incidents"
    }
);

module.exports = mongoose.model('Incident', incidentModel);