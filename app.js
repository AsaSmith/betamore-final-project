var express = require('express');
var bodyParser = require('body-parser')

var app = express();
app.set('view engine', 'jade');

app.use('/bower_components',
  express.static(__dirname + '/bower_components'));


app.get('/', function(req, res){
  res.render('register.jade');
});

app.get('/login', function(req, res){
  res.render('login.jade');
});

app.get('/dashboard', function(req, res){
  res.render('dashboard.jade');
});

app.listen(3000);
