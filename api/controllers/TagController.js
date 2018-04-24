const Tag = require('../models').Tag;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, tag;
    // let user = req.user;
    let postId = req.body.postId;
    let userId = req.body.userId;
    let tag_info = req.body;

    console.log('Post Id is ' + postId + '. User ID is ' + userId);

    [err, tag] = await to(Tag.create(tag_info));
    if(err) {
        console.log('Error is ' + JSON.stringify(err));
        return ReE(res, err, 422);
    };

    // tag.addUser(user, { through: { status: 'tagged' }})

    // [err, tag] = await to(tag.save());
    // if(err) return ReE(res, err, 422);

    let tag_json = tag.toWeb();
    // tag_json.users = [{user:user.id}];

    return ReS(res,{tag:tag_json}, 201);
}
module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;
    let err, tags;

    [err, tags] = await to(user.getPosts({include: [ {association: Tag.Users} ] }));

    let tags_json =[]
    for( let i in tags){
        let tag = tags[i];
        let users =  tag.Users;
        let tag_info = tag.toWeb();
        let users_info = [];
        for (let i in users){
            let user = users[i];
            // let user_info = user.toJSON();
            users_info.push({user:user.id});
        }
        tag_info.users = users_info;
        tags_json.push(tag_info);
    }

    console.log('c t', tags_json);
    return ReS(res, {tags:tags_json});
}
module.exports.getAll = getAll;

const get = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let tag = req.tag;

    return ReS(res, {tag:tag.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    let err, tag, data;
    tag = req.tag;
    data = req.body;
    tag.set(data);

    [err, tag] = await to(tag.save());
    if(err){
        return ReE(res, err);
    }
    return ReS(res, {tag:tag.toWeb()});
}
module.exports.update = update;

const remove = async function(req, res){
    let tag, err;
    tag = req.tag;

    [err, tag] = await to(tag.destroy());
    if(err) return ReE(res, 'error occured trying to delete the tag');

    return ReS(res, {message:'Deleted Tag'}, 204);
}
module.exports.remove = remove;