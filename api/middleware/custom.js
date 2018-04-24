const Models = require('./../models/index');
const Company 			    = require('./../models/company');

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


const Post               = Models.Post;

let post = async function (req, res, next) {
    let post_id, err, post;
    post_id = req.params.post_id;

    [err, post] = await to(Post.findOne({id:post_id}));
    if(err) return ReE(res,"err finding post");

    if(!post) return ReE(res, "Post not found with id: "+post_id);
    let user, users_array;
    user = req.user;

    req.post = post;
    next();
}
module.exports.post = post;

const Tag               = require('./../models/tag');

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