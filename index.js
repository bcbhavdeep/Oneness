var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var expressValidator = require('express-validator');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var config = require('./config/database');
app.use(express.static('public'));
//connecting mongoose
mongoose.connect(config.database, { useNewUrlParser: true });
var db=mongoose.connection;

//check if mongo connected
db.once('open', function(){
  console.log('Connected to mongoDB');
});

//check for db error
db.on('error', function(err){
  console.log(err);
});

//Bring in models
var User = require('./models/User');

//for parsing json
app.use(bodyParser.json());
//for url encoded
app.use(bodyParser.urlencoded({ extended: true }));

//setting view engine to ejs
app.set('view engine','ejs');

//session middleware
app.use(session({
  secret: 'trustworthyliarcat',
  resave: true,
  saveUninitialized: true
}));

//express messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//express validator middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value){
    var namespace = param.split('.'),
    root = namespace.shift(),
    formParam = root;
    while(namespace.length){
      formParam+='['+namespace.shift()+']';
    }
    return {
      param : formParam,   msg : msg,   value : value
    };
  }
}));

//Passport config
require('./config/passport')(passport)
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//adding routes
require('./app/routes.js')(app,passport);

console.log('listening port is :3001');
app.listen(3001);
