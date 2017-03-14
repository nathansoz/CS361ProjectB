/*
  browse.js
  routes for users who are browsing for furniture
 */
var db = require('../models');

var __MOCK_DATA__ = [{
    id: 1,
    name: 'table',
    description: 'rusty',
    location: 'Stockton',
    bank: 'furniture bank 2'
}, {
    id: 2,
    name: 'table',
    description: 'like new',
    location: 'LA',
    bank: 'furniture bank 3'
}, {
    id: 3,
    name: 'piano',
    description: 'smelly',
    location: 'Sacramento',
    bank: 'furniture bank 1'
}, {
    id: 4,
    name: 'chair',
    description: 'bright pink',
    location: 'Vacaville',
    bank: 'furniture bank 1'
}]; // TODO: REMOVE / move to testing

// route for users to browse listings of furniture
exports.browse = function(req, res) {
    res.status(200);
    res.render('browse', {
        data: __MOCK_DATA__ //TODO: remove mock, hook up to db
    });
};
// route for users to make appointments from
exports.appointment = function(req, res) {
    var data = {};
    var id = req.params.id;
    if (id) {
        data = __MOCK_DATA__.find(obj => obj.id === +id); //TODO: remove mock data, hook up to db
    }
    res.status(200);
    res.render('appointment', data);
};
// route for when user submits a new appointment
exports.appointmentNew = function(req, res) {
    /*
    // Front-End Verification
    // TODO: change to correct values!
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'username is required').notEmpty();
    req.checkBody('password', 'password is required').notEmpty();
    req.checkBody('password2', 'passwords do not match').equals(req.body.password);
    var errors = req.validationErrors();
    if (errors) {
        res.render('register', {
            errors: errors
        });
    }
    else {
        console.log("Does not recognize below as a function.");
        db.User.find({
            where: {
                username: req.username
            }
        }).success(function(user) {
            if (!user) {
                console.log("user should be created here.");
                /*db.User.create({username: req.body.username, password: req.body.password}).error(function(err){
                  console.log(err);
            }); * /
            }
            else {
                res.redirect('/register');
            }
        });
        console.log('Registration Passed');
        res.redirect('/');
    }
    */
    res.redirect(200, '/');
};
