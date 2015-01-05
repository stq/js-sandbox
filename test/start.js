var express = require('express');
var app = express();

app.use('/js-sandbox', express.static(__dirname + '/../'));

app.listen(1337);
console.warn('App started at: http://localhost:1337/js-sandbox');


