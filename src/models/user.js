"use strict";
var bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        classMethods: {
            validPassword: function(password, passwd, done, user) {
                bcrypt.compare(password, passwd, function(err, isMatch) {
                    if (err) console.log(err);
                    if (isMatch) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false);
                    }
                });
            }
        }
    }, {
        dialect: 'mysql'
    });
    // Everytime user is created hash a password
    User.hook('beforeCreate', function(user, fn) {
        user.dataValues.password = bcrypt.hashSync(user.dataValues.password, bcrypt.genSaltSync(8), null);
    });
    return User;
};
