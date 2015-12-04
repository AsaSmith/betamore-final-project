var express = require('express');

var app = express();
app.set('view engine', 'jade');

app.use('/bower_components',
  express.static(__dirname + '/bower_components'));


app.get('/', function(req, res){
  res.render('register.jade');
});

app.listen(3000);
