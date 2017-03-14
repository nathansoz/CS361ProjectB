// bank.js represents a furniture bank in the database
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Bank = sequelize.define("Bank", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Bank.belongsTo(models.Address);
            }
        }
    });
    return Bank;
};
