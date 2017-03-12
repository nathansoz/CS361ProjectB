"use strict";
// This exports a db object that can be used to interact with
// the ORM Any files in path src/models get sourced in and
// hooked up per:
// http://sequelize.readthedocs.io/en/1.7.0/articles/express/
var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var sequelize = new Sequelize("fbank", "root", "fbdev", { host: "localhost" });
var mysql     = require('mysql');
var sleep     = require('sleep');
var db        = {};

function tryConnect(callback)
{
    console.log("Attempting to open db connection");
    var mysql_connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'fbdev'
    });
    mysql_connection.connect(function(err) {
        if (err) {
            sleep.sleep(5);
            tryConnect(callback);
        }
        else {
            mysql_connection.query('CREATE DATABASE IF NOT EXISTS fbank', function(error, results) {
                callback();
            });
        }
    });
}

db.init = function(callback) {
    tryConnect(function() {
        console.log("DB connection opened.")
        fs.readdirSync(__dirname).filter(function(file) {
            return (file.indexOf(".") !== 0) && (file !== "index.js");
        }).forEach(function(file) {
            var model = sequelize.import(path.join(__dirname, file));
            db[model.name] = model;
        });
        Object.keys(db).forEach(function(modelName) {
            if ("associate" in db[modelName]) {
                db[modelName].associate(db);
            }
        });
        callback();
    })
};

db.sequelize = sequelize;
module.exports = db;
