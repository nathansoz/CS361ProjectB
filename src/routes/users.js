//users.js
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

exports.homepage = function(req, res) {
    res.render("userhome", {
        myVar: req.user.username
    });
};
exports.register = function(req, res) {
    res.render('register');
};
exports.login = function(req, res) {
    res.render('login');
};
// route for users to browse listings of furniture
exports.browse = function(req, res) {
  // TODO: remove mock data, hook up to api, tests, err checking
    res.status(200);
    res.render('browse', {
        data: __MOCK_DATA__
    });
};
// route for users to make appointments from
exports.appointment = function(req, res) {
  // TODO: remove mock data, hook up to db, build tests, err check
    var data = {};
    var id = req.params.id;
    if (id) {
        data = __MOCK_DATA__.find(obj => obj.id === +id);
    }
    res.status(200);
    res.render('appointment', {data});
};
// route for when user submits a new appointment
exports.appointmentNew = function(req, res) {
    //TODO: handle subbmitting a new appointment -> error checking, api calls, tests
    res.redirect(200, '/');
};
// route for adding furniture to bank inventory
exports.addInventory = function(req, res) {
    // TODO: remove mock data, hook up to db etc etc
    var data = {};
    res.status(200);
    res.render('addinventory', {
        data: __MOCK_DATA__
    });
};
// route for when bank submits new Item
exports.newInventory = function(req, res) {
    // FIXME
};
// route for swapping furniture
exports.swap = function(req, res) {
    res.render('swap');
    //TODO: pulling from db goes here!
};
exports.bankSwap = function(req, res) {
    db.Item.find({
        where: {
            name: req.body.item
        }
    }).success(function() {
        /*db.Item({locatedAt: req.body.bankTwo}).error(function(err){
            console.log(err);
        }); */
    });
};
exports.registerNew = function(req, res) {
    // Front-End Verification:
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
        db.User.findOne({
            where: {
                username: req.username
            }
        }).then(function(user) {
            if (!user) {
                console.log("user should be created here.");
                db.User.create({username: req.body.username, password: req.body.password}).error(function(err){
                    console.log(err);
                });
            }
            else {
                res.redirect('/register');
            }
        });
        console.log('Registration Passed');
        res.redirect('/');
    }
};
