const Models = require('./../models/index');
// const Company 			    = require('./../models/company');
const Company = Models.Company;
let company = async function (req, res, next) {
    let company_id, err, company;
    company_id = req.params.company_id;

    [err, company] = await to(Company.findOne({_id:company_id}));
    if(err) return ReE(res,"err finding company");

    if(!company) return ReE(res, "Company not found with id: "+company_id);
    let user, users_array;
    user = req.user;
    users_array = company.users.map(obj=>String(obj.user));

    if(!users_array.includes(String(user._id))) return ReE(res, "User does not have permission to read app with id: "+app_id);

    req.company = company;
    next();
}
module.exports.company = company;


const Post = Models.Post;

let post = async function (req, res, next) {
    let post_id, err, post;
    post_id = req.params.post_id;
    console.log('finding post_id...' + req.params.post_id);
    [err, post] = await to(Post.findOne({where: {id:post_id}}));
    if(err) return ReE(res,"err finding post");

    if(!post) return ReE(res, "Post not found with id: "+post_id);
    let user, users_array;
    user = req.user;

    req.post = post;
    next();
}
module.exports.post = post;

// const Tag               = require('./../models/tag');
const Tag = Models.Tag;

let tag = async function (req, res, next) {
    let tag_id, err, tag;
    tag_id = req.params.tag_id;

    [err, tag] = await to(Tag.findOne({_id:tag_id}));
    if(err) return ReE(res,"err finding tag");

    if(!tag) return ReE(res, "Tag not found with id: "+tag_id);
    let user, users_array;
    user = req.user;
    req.tag = tag;
    next();
}
module.exports.tag = tag;


const Menu = Models.Menu;

let menu = async function (req, res, next) {
    let menu_id, err, post;
    menu_id = req.params.menu_id;
    console.log('finding menu_id...' + req.params.menu_id);
    [err, menu] = await to(Menu.findOne({where: {id: menu_id}}));
    if(err) return ReE(res,"err finding menu");

    if(!menu) return ReE(res, "Menu not found with id: " + menu_id);
    let user, users_array;
    user = req.user;

    req.menu = menu;
    next();
}
module.exports.menu = menu;

// const Page               = require('./../models/page');
const Page               = Models.Page;

let page = async function (req, res, next) {
    let page_id, err, page;
    page_id = req.params.page_id;

    [err, page] = await to(Page.findOne({_id: page_id}));
    if(err) return ReE(res,"err finding page");

    if(!page) return ReE(res, "Page not found with id: " + page_id);
    let user, users_array;
    user = req.user;
    req.page = page;
    next();
}
module.exports.page = page;