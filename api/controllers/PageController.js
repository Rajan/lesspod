const Page = require('../models').Page;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, page;
    // let user = req.user;
    let menuId = req.body.menuId;
    let userId = req.body.userId;
    let page_info = req.body;

    console.log('Menu Id is ' + menuId + '. User ID is ' + userId);

    [err, page] = await to(Page.create(page_info));
    if(err) {
        console.log('Error is ' + JSON.stringify(err));
        return ReE(res, err, 422);
    };

    // page.addUser(user, { through: { status: 'pageged' }})

    // [err, page] = await to(page.save());
    // if(err) return ReE(res, err, 422);

    let page_json = page.toWeb();
    // page_json.users = [{user:user.id}];

    return ReS(res,{page:page_json}, 201);
}
module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;
    let err, pages;

    [err, pages] = await to(user.getMenus({include: [ {association: Page.Users} ] }));

    let pages_json =[]
    for( let i in pages){
        let page = pages[i];
        let users =  page.Users;
        let page_info = page.toWeb();
        let users_info = [];
        for (let i in users){
            let user = users[i];
            // let user_info = user.toJSON();
            users_info.push({user:user.id});
        }
        page_info.users = users_info;
        pages_json.push(page_info);
    }

    console.log('c t', pages_json);
    return ReS(res, {pages:pages_json});
}
module.exports.getAll = getAll;

const get = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let page = req.page;

    return ReS(res, {page:page.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    let err, page, data;
    page = req.page;
    data = req.body;
    page.set(data);

    [err, page] = await to(page.save());
    if(err){
        return ReE(res, err);
    }
    return ReS(res, {page:page.toWeb()});
}
module.exports.update = update;

const remove = async function(req, res){
    let page, err;
    page = req.page;

    [err, page] = await to(page.destroy());
    if(err) return ReE(res, 'error occured trying to delete the page');

    return ReS(res, {message:'Deleted Page'}, 204);
}
module.exports.remove = remove;