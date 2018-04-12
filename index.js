
const Bundler = require('parcel-bundler');
const path = require('path');
let app = require('express')();
require('./js/index.js')

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

// home page
app.get('/', (req, res) => {
  // render `home.ejs` with the list of posts
  res.render('register.ejs', {})
})

// const config = require('parcel.config.js')

// const bundler = new Bundler(config.file, config.options);

// app.use(bundler.middleware());

app.listen(1234)

app.use("index", (req, res) => {
    app.render("index", {uname: "rajan"});
})