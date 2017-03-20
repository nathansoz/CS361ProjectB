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
// foute for registering furniture bank
exports.registerBank = function(req, res) {
    res.status(200);
    res.render('registerBank');
}
exports.bankNew = function(req, res) {
    // Front-end varification:
    var name = req.body.name;
    var line1 = req.body.line1;
    var line2 = req.body.line2;
    var city = req.body.city;
    var state = req.body.state;
    var country = req.body.country;
    req.checkBody('name', 'Furniture Bank Name is required').notEmpty();
    req.checkBody('line1', 'Address line 1 is required').notEmpty();
    req.checkBody('city', 'City is required').notEmpty();
    req.checkBody('state', 'State is required').notEmpty();
    req.checkBody('country', 'Country is required').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        res.render('register', {
            errors: errors
        });
    }
    else {
        console.log("Does not recognize below as a function.");
        db.Bank.findOne({
            where: {
                name: req.name
            }
        }).then(function(bank) {
            if (!bank) {
                // FIXME this is basically done, can't find how to make reference to the foreign id :(
                db.Bank.create({name: req.body.name, belongsTo:
                    (db.Address.create({primaryAddressLine: req.body.line1, secondaryAddressLine: req.body.line2, city: req.body.city, state: req.body.state, country: req.body.country}))
                }).error(function(err){
                    console.log(err);
                });
            }
            else {
                res.redirect('/registerBank');
            }
        });
        console.log('Bank Registration Passed');
        res.redirect('/');
    }
}
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
    db.Item.create({
        name: req.body.itemType,
        description: req.body.description,
        wearPercentage: req.body.itemWear
        // TODO link to donor!
        // TODO link to furniture bank!
    }).error(function(err){
        console.log(err);
    });
    console.log("Item submitted");
    res.render('addinventory');
};
// route for swapping furniture
exports.swap = function(req, res) {
    res.status(200);
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
exports.donate = function(req, res) {
    res.render('donate');
};
exports.donateNew = function(req, res) {
    db.Item.create({
        name: req.body.itemType,
        description: req.body.description,
        wearPercentage: req.body.itemWear
        // TODO link to donor!
    }).error(function(err){
        console.log(err);
    });
    console.log("Item submitted");
    res.render('donate');
}
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
