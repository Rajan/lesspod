require('./config/config');     
require('./global_functions'); 

const Bundler = require('parcel-bundler');
const path = require('path');
const express = require('express');
const passport = require('passport')
var router = express.Router();
let app = express();
// require('./js/index.js')
const logger 	    = require('morgan');
const bodyParser = require('body-parser');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

const v1 = require('./routes/v1');

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(express.static(__dirname + '/public'));


//Passport
app.use(passport.initialize());

//DATABASE
const models = require("./api/models");



// app.use('/', function(req, res){
//   res.statusCode = 200;//send the appropriate status code
//   res.json({status:"success", message:"Parcel Pending API", data:{}})
// });

// CORS
// app.use(function (req, res, next) {
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, Content-Type');
//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     // Pass to next layer of middleware
//     next();
// });


app.use('/v1', v1);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// home page (public)
app.get('/', (req, res) => {

 	res.render('landing.ejs', {});

})

app.get('/home', (req, res) => {

 	res.render('home.ejs', {});

})

app.get('/login', (req, res) => {

	res.render('login.ejs', {});

});

app.get('/logout', (req, res) => {

	res.render('landing.ejs', {});

});

app.get('/register', (req, res) => {

	res.render('register.ejs', {});
	return res.redirect('login');

});

// app.post('/user/create', (req, res) => {

// 	// code to create user. once the user is created, she should be redirected to internal homepage/dashboard.

// });

app.get('/newpost', (req, res) => {

	// create post
	res.render('newpost.ejs', {});

});

app.get('/post/:postId', (req, res) => {
	// view post

});


app.get('/blog', (req, res) => {
	// view the posts index
	res.render('posts.ejs', {});

});

app.get('/posts', (req, res) => {
	// view the posts index
	res.render('posts.ejs', {});

});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });


// const config = require('parcel.config.js')

// const bundler = new Bundler(config.file, config.options);

// app.use(bundler.middleware());

app.listen(1234)

app.use("index", (req, res) => {
    app.render("index", {uname: "rajan"});
})
