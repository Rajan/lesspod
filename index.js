
const Bundler = require('parcel-bundler');
const path = require('path');
const express = require('express');
var router = express.Router();
let app = express();
// require('./js/index.js')

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(express.static(__dirname + '/public'));

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

});

app.post('/user/create', (req, res) => {

	// code to create user. once the user is created, she should be redirected to internal homepage/dashboard.

});

app.post('/post/create', (req, res) => {

	// create post

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



// const config = require('parcel.config.js')

// const bundler = new Bundler(config.file, config.options);

// app.use(bundler.middleware());

app.listen(1234)

app.use("index", (req, res) => {
    app.render("index", {uname: "rajan"});
})