var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
  if(process.env['FBDEV']) {
    console.log('Dev environment variable set! Using dev settings...');
  }
})
