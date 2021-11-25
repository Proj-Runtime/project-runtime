/*
  Student ID: 301145757 , 301143620 , 301173877 , 301178658 , 301182897 , 300977318
  Web App Name: Runtime
  Description: An Incident Management Application
*/

// require modules for the User model 
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema(
    {
        username:
        {
            type: String,
            default: '',
            trim: true,
            required: 'username is required'
        },
        email:
        {
        type: String,
            default: '',
            trim: true,
            required: 'email is required'
        },
        userType:
        {
            type: String,
            default: '',
            trim: true,
            required: 'usertype is required'
        }
    },
    {
        collection: "users"
    }
);

//configure options for User Model

let options = ({ missingPasswordError: 'Wrong / Missing Password'});

User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', User);