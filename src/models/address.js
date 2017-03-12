// address.js
// represents an address in the database

"use strict";

module.exports = function(sequelize, DataTypes) {
    var Address = sequelize.define("Address", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        primaryAddressLine: DataTypes.STRING,
        secondaryAddressLine: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        country: DataTypes.STRING
    });

    return Address;
};
