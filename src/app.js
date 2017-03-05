var express = require('express')
var app = express()
var db = require('./models/index.js')
var models = require('./models')

function seed() {
    db.sequelize.sync({force: true}).then(function() {
        models.Customer.create({ username: "test" });
    });
}


app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
  if(process.env['FBDEV']) {
    console.log('Dev environment variable set! Using dev settings...');
    console.log('Creating sample user');
    db.init(function() { seed() });
  }
})
