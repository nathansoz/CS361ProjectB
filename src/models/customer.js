"use strict";

module.exports = function(sequelize, DataTypes) {
    var Customer = sequelize.define("Customer", {
        username: DataTypes.STRING
    });

    return Customer;
};
