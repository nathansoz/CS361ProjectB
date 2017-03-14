// item.js
// represents a item in the database

"use strict";

module.exports = function(sequelize, DataTypes) {
    var Item = sequelize.define("Item", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        wearPercentage: DataTypes.INTEGER
    },
    {
        classMethods: {
            associate: function(models) {
                Item.belongsTo(models.Donor);
            }
            // please review, not familiar with setting mysql tables like this!
            associate: function(models) {
                Item.locatedAt(models.Bank);
            }
        }
    });

    return Item;
};
