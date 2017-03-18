// donor.js
// represents a donor in the database
"use strict";
var address = require('./address.js');
module.exports = function(sequelize, DataTypes) {
    var Donor = sequelize.define("Donor", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Donor.belongsTo(models.Address);
            }
        }
    });
    return Donor;
};
