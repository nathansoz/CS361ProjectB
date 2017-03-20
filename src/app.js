var express = require('express');
var path = require('path');
// This may not be required and is deprecated past 1.5.0 -
// needs further review:
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
// flash messages - used for validation messages
var flash = require('connect-flash');
// session handling:
var session = require('express-session');
var passport = require('passport');
var passportConfig = require('./config/passport');
var localStrategy = require('passport-local').Strategy;
// db accesses index.js - handles docker mysql
var db = require('./models');
// route handling
var application = require('./routes/application');
var routes = require('./routes');
var users = require('./routes/users');

var app = express();

SALT_WORK_FACTOR = 12;

// Specify where views is located if moved...
// app.set('views', __dirname + '/views')
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
// Middleware to parse data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
// currently links to bootstrap and jquery -> will link in
// through app later
app.use('/static_modules', express.static('./node_modules'));
// local dependencies: ie css/images/script
app.use(express.static(path.join(__dirname, 'public')));
// Express sessions:
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));
// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

function seed() {
    db.sequelize.sync({
        force: true
    }).then(function() {
        db.Customer.create({
            username: "test"
        });
        db.Address.create({
            primaryAddressLine: "123 Awesome St.",
            city: "Seattle",
            state: "Washington",
            country: "USA"
        }).then(function(addr) {
            db.Bank.create({
                name: "Big Bank"
            }).then(function(bank) {
                bank.setAddress(addr);
            });
        });
    });
}
// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;
        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));
// connect Flash
app.use(flash());
// Global Vars for flash messages
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});
// Using routes:
app.get('/', routes.index);
// app.get('/userhome', application.IsAuthenticated,
// userhome.userhome)
app.get('/register', users.register);
app.post('/register', users.registerNew);
app.get('/login', users.login);
app.post('/authenticate', passport.authenticate('local', {
    successRedirect: '/userhome',
    failureRedirect: '/'
}));
app.get('/browse', users.browse);
app.get('/appointment/:id', users.appointment); // populate from selection
app.get('/appointment', users.appointment);     // empty appointment
app.post('/appointment', users.appointmentNew);
app.get('/addinventory', users.addInventory);
app.post('/addinventory', users.newInventory);
app.get('/swap', users.swap);
app.post('/swap', users.bankSwap);
app.get('/registerbank', users.registerBank);
app.post('/registerbank', users.bankNew);
app.get('/donate', users.donate);
app.post('/donate', users.donateNew);
// After user authentication
app.get('/userhome', application.IsAuthenticated, users.homepage);
// Logout of session
app.get('/logout', application.destroySession);

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
    if (process.env['FBDEV']) {
        console.log('Dev environment variable set! Using dev settings...');
        console.log("No Database Connection.\nRemove comments from lines 122-123(" + "app.js) to connect to mysql");
        console.log('Creating sample user');
        db.init(function() { seed() });
    }
});
// export for testing
module.exports = app;
