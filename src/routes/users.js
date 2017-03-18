//users.js
var db = require('../models');
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
exports.browse = function(req, res) {
    res.render('browse');
    // pulling from db goes here!
}
exports.swap = function(req, res) {
    res.render('swap');
    // pulling from db goes here!
}
exports.bankSwap = function(req, res) {
    db.Item.find({
        where: {
            name: req.body.item
        }
    }).success(function(){
        /*db.Item({locatedAt: req.body.bankTwo}).error(function(err){
            console.log(err);
        }); */
    });
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
