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

app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', function(req, res){
  res.render('index.jade');
});

app.get('/register', function(req, res){
  res.render('register.jade');
});

app.post('/register', function(req, res){
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
    var  err = 'A User name is already associated with that email';
    }
    res.render('register.jade', {error: err});
  }else {
    res.redirect('/dashboard');
    }
  });
});


app.get('/login', function(req, res){
  res.render('login.jade');
});

app.post('/login', function(req, res){
  User.findOne({userName: req.body.userName}, function(err, user){
    if(!user){
      res.render('login.jade', {error: 'Nope'});
    }else{
      if(req.body.password === user.password){
        res.redirect('/dashboard');
      }else{
        res.render('login.jade', {error: 'Wrong'});
      }
    }
  })
})

app.get('/dashboard', function(req, res){
  res.render('dashboard.jade');
});

app.listen(3000, function(){
  console.log('Listening...')
});
