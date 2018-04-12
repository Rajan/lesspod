
const Bundler = require('parcel-bundler');
const path = require('path');
const express = require('express');
var router = express.Router();
let app = express();
// require('./js/index.js')

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(express.static(__dirname + '/public'));
// home page
app.get('/', (req, res) => {

 	res.render('register.ejs', {});

})

app.get('/login', (req, res) => {

	res.render('login.ejs', {});

});

app.get('/register', (req, res) => {

	res.render('register.ejs', {});

});

// const config = require('parcel.config.js')

// const bundler = new Bundler(config.file, config.options);

// app.use(bundler.middleware());

app.listen(1234)

app.use("index", (req, res) => {
    app.render("index", {uname: "rajan"});
})