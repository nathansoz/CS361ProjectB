"use strict";
module.exports = function(sequelize, DataTypes) {
    var Customer = sequelize.define("Customer", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        username: DataTypes.STRING
    });
    return Customer;
};
