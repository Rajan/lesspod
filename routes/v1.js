const express 			= require('express');
const router 			= express.Router();

const UserController 	= require('./../api/controllers/UserController');
const PostController = require('./../api/controllers/PostController');
const TagController = require('./../api/controllers/TagController');
const MenuController = require('./../api/controllers/MenuController');
const SettingController = require('./../api/controllers/SettingController');
const PageController = require('./../api/controllers/PageController');
const CompanyController = require('./../api/controllers/CompanyController');
const HomeController 	= require('./../api/controllers/HomeController');
const uploader = require('../config/uploaderConfig');
const custom 	        = require('./../api/middleware/custom');

const passport      	= require('passport');
const path              = require('path');




require('./../api/middleware/passport')(passport);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({status:"success", message:"Test API", data:{"version_number":"v1.0.0"}})
});

router.post(    '/users',           UserController.create);                                                    // C
router.get(     '/users',           passport.authenticate('jwt', {session:false}), UserController.get);        // R
router.put(     '/users',           passport.authenticate('jwt', {session:false}), UserController.update);     // U
router.delete(  '/users',           passport.authenticate('jwt', {session:false}), UserController.remove);     // D
router.post(    '/users/login',     UserController.login);

router.post(     '/users/pic',       passport.authenticate('jwt', {session:false}), uploader.single('avatar'), UserController.updatePic);     // U
router.get(      '/users/pic',       passport.authenticate('jwt', {session:false}), UserController.getPic);                                     // R

router.post(    '/posts',             passport.authenticate('jwt', {session:false}), PostController.create);                  // C
router.get(     '/posts',             PostController.getAll);                  // R

router.get(     '/posts/:post_id',  custom.post, PostController.get);     // R
router.put(     '/posts/:post_id', passport.authenticate('jwt', {session:false}), custom.post, PostController.update);  // U
router.delete(  '/posts/:post_id', passport.authenticate('jwt', {session:false}), custom.post, PostController.remove);  // D


router.post(    '/menus',             passport.authenticate('jwt', {session:false}), MenuController.create);                  // C
router.get(     '/menus',	MenuController.getAll);                  // R

router.get(     '/menus/:menu_id', passport.authenticate('jwt', {session:false}), custom.menu, MenuController.get);     // R
router.put(     '/menus/:menu_id', passport.authenticate('jwt', {session:false}), custom.menu, MenuController.update);  // U
router.delete(  '/menus/:menu_id', passport.authenticate('jwt', {session:false}), custom.menu, MenuController.remove);  // D

router.post(    '/settings',             passport.authenticate('jwt', {session:false}), SettingController.create);                  // C
router.get(     '/settings',	SettingController.getAll);                  // R

router.post(    '/settings/logo',       passport.authenticate('jwt', {session:false}), uploader.single('logo'), SettingController.updateLogo);     // U
router.get(     '/settings/logo',       SettingController.getLogo);     // R

router.get(     '/settings/byName/:setting_name', custom.settingByName, SettingController.get);     // R
router.get(     '/settings/:setting_id', custom.setting, SettingController.get);     // R
router.put(     '/settings/:setting_id', passport.authenticate('jwt', {session:false}), custom.setting, SettingController.update);  // U
router.delete(  '/settings/:setting_id', passport.authenticate('jwt', {session:false}), custom.setting, SettingController.remove);  // D

router.post(    '/pages',             passport.authenticate('jwt', {session:false}), PageController.create);                  // C
router.get(     '/pages',             passport.authenticate('jwt', {session:false}), PageController.getAll);                  // R

router.get(     '/pages/:page_id', passport.authenticate('jwt', {session:false}), custom.page, PageController.get);     // R
router.put(     '/pages/:page_id', passport.authenticate('jwt', {session:false}), custom.page, PageController.update);  // U
router.delete(  '/pages/:page_id', passport.authenticate('jwt', {session:false}), custom.page, PageController.remove);  // D

router.post(    '/tags',             passport.authenticate('jwt', {session:false}), TagController.create);                  // C
router.get(     '/tags',             passport.authenticate('jwt', {session:false}), TagController.getAll);                  // R

router.get(     '/tags/:tag_id', passport.authenticate('jwt', {session:false}), custom.tag, TagController.get);     // R
router.put(     '/tags/:tag_id', passport.authenticate('jwt', {session:false}), custom.tag, TagController.update);  // U
router.delete(  '/tags/:tag_id', passport.authenticate('jwt', {session:false}), custom.tag, TagController.remove);  // D


router.post(    '/companies',             passport.authenticate('jwt', {session:false}), CompanyController.create);                  // C
router.get(     '/companies',             passport.authenticate('jwt', {session:false}), CompanyController.getAll);                  // R

router.get(     '/companies/:company_id', passport.authenticate('jwt', {session:false}), custom.company, CompanyController.get);     // R
router.put(     '/companies/:company_id', passport.authenticate('jwt', {session:false}), custom.company, CompanyController.update);  // U
router.delete(  '/companies/:company_id', passport.authenticate('jwt', {session:false}), custom.company, CompanyController.remove);  // D

router.get('/dash', passport.authenticate('jwt', {session:false}),HomeController.Dashboard)


//********* API DOCUMENTATION **********
// router.use('/docs/api.json',            express.static(path.join(__dirname, '/../public/v1/documentation/api.json')));
// router.use('/docs',                     express.static(path.join(__dirname, '/../public/v1/documentation/dist')));
module.exports = router;
