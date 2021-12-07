/*
  Student ID: 301145757 , 301143620 , 301173877 , 301178658 , 301182897 , 300977318
  Web App Name: Runtime
  Description: An Incident Management Application
*/

// create a reference to the model
let Incident = require('../../server/models/incident');

// Gets all incidents from the Database and renders the page to list all incidents.
module.exports.incidentList = function(req, res, next) {  
    Incident.find((err, incidentList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('incident/list', {
                title: 'Incident Dashboard', 
                incidents: incidentList,
                username: req.user ? req.user.username : ''
            })            
        }
    });
}

// Gets a incident by id and renders the details page.
module.exports.details = (req, res, next) => {
    
    let id = req.params.id;

    incident.findById(id, (err, incidentToShow) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('incident/details', {
                title: 'Incident Dashboard', 
                incident: incidentToShow,
                username: req.user ? req.user.username : ''
            })
        }
    });
}

// Renders the Add form using the add_edit.ejs template
module.exports.displayAddPage = (req, res, next) => {
    let newIncident = Incident();
    res.render('incident/add_edit', 
    {
        title: 'Add Incident Report', 
        incident:newIncident, 
        username: req.user ? req.user.username : ''
    })          
}


// Processes the data submitted from the Add form to create a new incident
module.exports.processAddPage = (req, res, next) => {
    let newIncident = Incident({
        _id: req.body.id,
        RecordNumber: req.body.RecordNumber,
        Description: req.body.Description,
        Priority: req.body.Priority,
        Narrative: req.body.Narrative,
        RequesterName: req.body.RequesterName,
        Technician: req.body.Technician,
        Status: req.body.Status,
        CreatedDate: req.body.CreatedDate,
    });

    let currentDate = new Date();
    let day = currentDate.getDate().toString();
    let month = (currentDate.getMonth() + 1).toString();
    let year = currentDate.getFullYear().toString().substr(-2);
    let newTicketNumber;
    let timestampNarr = currentDate;

    Incident.findOne({}, {}, { sort: { 'RecordNumber' : -1 } }, function(err, result) {
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            const zeroPad = (num, places) => String(num).padStart(places, '0');
            if (result == null || result.RecordNumber == null || result.RecordNumber == "undefined"){
                newTicketNumber = zeroPad(1, 7);
            } else {
                let RecordNumber = result.RecordNumber.toString();
                let extractedLastNumber = parseInt(RecordNumber.substring(RecordNumber.length - 7));
                newTicketNumber = zeroPad(extractedLastNumber + 1, 7);
            }

            newIncident.RecordNumber = day + month + year + "-" + newTicketNumber;

            let createdStr = "Created at " + Math.round(new Date().getTime()/1000) +"; ";
            newIncident.narrativeLatest = createdStr;
            newIncident.narrative = createdStr;

            Incident.create(newIncident, (err, Incident) =>{
                if(err)
                {
                    console.log(err);
                    res.end(err);
                }
                else
                {
                    // refresh the incident list
                    res.redirect('/incident/list');
                }
            });
        }
    });    
}

// Gets a incident by id and renders the Edit form using the add_edit.ejs template
module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Incident.findById(id, (err, incidentToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('incident/add_edit', 
            {
                title: 'Edit Incident Report', 
                incident: incidentToEdit, 
                username: req.user ? req.user.username : ''
            })
        }
    });
}

// Processes the data submitted from the Edit form to update a incident
module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedIncident = Incident({
        _id: req.body.id,
        RecordNumber: req.body.RecordNumber,
        Description: req.body.Description,
        Priority: req.body.Priority,
        Narrative: req.body.Narrative,
        RequesterName: req.body.RequesterName,
        Technician: req.body.Technician,
        Status: req.body.Status,
        CreatedDate: req.body.CreatedDate,
    });

    Incident.updateOne({_id: id}, updatedIncident, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the Incident list
            res.redirect('/incident/list');
        }
    });
}

// Gets an incident narrative and renders the page
module.exports.displayAudit = function(req, res, next) {  
    let id = req.params.id

    Incident.findById(id, (err, auditToDisplay) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the audit view
            res.render('incident/audit', 
            {
                title: 'Audit Trail', 
                incident: auditToDisplay, 
                username: req.user ? req.user.username : ''
            })
        }
    });
}

// Deletes an Incident based on its id.
module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Incident.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the Incident list
            res.redirect('/incident/list');
        }
    });
}