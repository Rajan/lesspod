'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var db        = {};
const Op = Sequelize.Op

const sequelize = new Sequelize(process.env.DB_NAME || 'lpDB', null, null, {
  host: 'localhost',
  dialect: 'sqlite',
  pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
  storage: './db.sqlite',
  operatorsAliases: {
    $and: Op.and,
    $or: Op.or,
    $eq: Op.eq,
    $gt: Op.gt,
    $lt: Op.lt,
    $lte: Op.lte,
    $like: Op.like
  }
});

sequelize
.authenticate()
.then(function(err) {
  console.log('Connection has been established successfully.');
}, function (err) {
  console.log('Unable to connect to the database:', err);
});

// const sequelize = new Sequelize(CONFIG.db_name, CONFIG.db_user, CONFIG.db_password, {
//   host: CONFIG.db_host,
//   dialect: CONFIG.db_dialect,
//   port: CONFIG.db_port,
//   socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
//   user: 'root',
//   password: 'root',
//   database: 'lesspod',
//   operatorsAliases: false
// });

fs
.readdirSync(__dirname)
.filter(file => {
  return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
})
.forEach(file => {
  var model = sequelize['import'](path.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;