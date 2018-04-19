const Bundler = require('parcel-bundler');
const path = require('path');
const file = path.join(__dirname, './src/index.js');

const options = {
  outDir: path.join(__dirname, './dist'), 
  outFile: 'app.js', 
  watch: true
};
module.exports = {file, options};