var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

mongoose.connect('mongodb://localhost:27017/newUsers');



var User = mongoose.model('User', new Schema({
  id: ObjectId,
  firstName: String,
  lastName: String,
  userName: {type: String, unique: true},
  email: {type: String, unique: true},
  password: String
}));
var app = express();
app.set('view engine', 'jade');

app.use('/bower_components',
  express.static(__dirname + '/bower_components'));

app.use(bodyParser.urlencoded({ extended: true}));
app.get('/', function(req, res){
  res.render('register.jade');
});

app.get('/register', function(req, res){
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password
  });
  user.save(function(err){
    if(err) {
      var err = 'Nope. Try again';
      if(err.code === 11000){
        error = 'A User name is already associated with that email';
      }
      res.render('register.jade', {error: error});
    }else {
      res.redirect('/dashboard.jade');
    }
  });
});

app.post('/register', function(req, res){
  res.json(req.body);
});

app.get('/login', function(req, res){
  res.render('login.jade');
});

app.get('/dashboard', function(req, res){
  res.render('dashboard.jade');
});

app.listen(3000);
