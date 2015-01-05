var express = require('express');
var app = express();

app.use('/testapp', express.static(__dirname + '/appcontent'));
app.use('/testapp/hypervisor', express.static(__dirname + '/../src/'));
app.use('/3rdparty', express.static(__dirname + '/3rdparty'));

app.listen(1337);
console.warn('App started at: http://localhost:1337/testapp');


