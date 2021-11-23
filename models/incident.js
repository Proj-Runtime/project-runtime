/*
  Student ID: 301145757 , 301143620 , 301173877 , 301178658 , 301182897 , 300977318
  Web App Name: Runtime
  Description: An Incident Management Application
*/


let mongoose = require('mongoose');

// Create a model class
let incidentModel = mongoose.Schema(
    {
        Description: String,
        Priority: {
            type: String,
            default: "Normal",       // e.g. Low, Normal, High
            trim: true
        },
        RequesterName: String,
        // RecordNumber: String,     // e.g. 130418-0000001 for Apr 13 2018, ticket no 1
        Narrative: String,          // e.g. 25/10/2020 - Changed status "normal" to "high"; 6/11/2020 - Ticket closed
        Technician: String,
        Status: {
            type: String,
            default: "New",         // e.g. New, In Progress, Closed
            trim: true
        },
        CreatedDate: {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: "incidents"
    }
);

module.exports = mongoose.model('Incident', incidentModel);