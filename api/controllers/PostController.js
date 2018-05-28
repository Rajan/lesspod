const Post = require('../models').Post;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, post;
    let user = req.user;

    let post_info = req.body;


    [err, post] = await to(Post.create(post_info));
    if(err) return ReE(res, err, 422);

    post.addUser(user, { through: { status: 'posted' }})

    [err, post] = await to(post.save());
    if(err) return ReE(res, err, 422);

    let post_json = post.toWeb();
    post_json.users = [{user:user.id}];

    return ReS(res,{post:post_json}, 201);
}
module.exports.create = create;

const getAll = async function(req, res){

    res.setHeader('Content-Type', 'application/json');
    let user = req.user;
    let err, posts;

    // [err, menus] = await to(user.getMenus({include: [ {association: Menu.Users} ] }));
    [err, posts] = await to(Post.findAll({}));
    // menus.reverse();
    let posts_json =[]
    for( let i in posts){
        let post = posts[i];
        let post_info = post.toWeb();
        posts_json.push(post_info);
    }

    console.log('c t', posts_json);
    return ReS(res, {posts:posts_json});

    // res.setHeader('Content-Type', 'application/json');
    // let user = req.user;
    // let err, posts;

    // [err, posts] = await to(user.getPosts({include: [ {association: Post.Users} ] }));
    // if(posts && posts.length){
    //     posts.reverse();
    // }
    // let posts_json =[]
    // for( let i in posts){
    //     let post = posts[i];
    //     let users =  post.Users;
    //     let post_info = post.toWeb();
    //     let users_info = [];
    //     for (let i in users){
    //         let user = users[i];
    //         // let user_info = user.toJSON();
    //         users_info.push({user:user.id});
    //     }
    //     post_info.users = users_info;
    //     posts_json.push(post_info);
    // }

    // console.log('c t', posts_json);
    // return ReS(res, {posts:posts_json});
}
module.exports.getAll = getAll;

const get = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let post = req.post;

    return ReS(res, {post:post.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    let err, post, data;
    post = req.post;
    data = req.body;
    post.set(data);

    [err, post] = await to(post.save());
    if(err){
        return ReE(res, err);
    }
    return ReS(res, {post:post.toWeb()});
}
module.exports.update = update;

const remove = async function(req, res){
    let post, err;
    post = req.post;

    console.log('deleting post_id...' + req.params.post_id);

    console.log('deleting post...' + JSON.stringify(post));
    
    [err, post] = await to(post.destroy());
    if(err) return ReE(res, 'error occured trying to delete the post');
    return ReS(res, {message:'Deleted Post'}, 204);

}
module.exports.remove = remove;