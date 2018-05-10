const Menu = require('../models').Menu;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, menu;
    let user = req.user;

    let menu_info = req.body;


    [err, menu] = await to(Menu.create(menu_info));
    if(err) {
        console.log(err);
        return ReE(res, err, 422);
    }

    menu.addUser(user, { through: { status: 'menuadded' }})

    [err, menu] = await to(menu.save());
    if(err) {
        console.log(err);
        return ReE(res, err, 422);
    }

    let menu_json = menu.toWeb();
    menu_json.users = [{user:user.id}];

    console.log('menu json: ' + JSON.stringify(menus_json));

    return ReS(res,{menu:menu_json}, 201);
}
module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;
    let err, menus;

    // [err, menus] = await to(user.getMenus({include: [ {association: Menu.Users} ] }));
    [err, menus] = await to(Menu.findAll({}));
    // menus.reverse();
    let menus_json =[]
    for( let i in menus){
        let menu = menus[i];
        // let users =  menu.Users;
        let menu_info = menu.toWeb();
        // let users_info = [];
        // for (let i in users){
        //     let user = users[i];
        //     // let user_info = user.toJSON();
        //     users_info.push({user:user.id});
        // }
        // menu_info.users = users_info;
        menus_json.push(menu_info);
    }

    console.log('c t', menus_json);
    return ReS(res, {menus:menus_json});
}
module.exports.getAll = getAll;

const get = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let menu = req.menu;

    return ReS(res, {menu:menu.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    let err, menu, data;
    menu = req.menu;
    data = req.body;
    menu.set(data);

    [err, menu] = await to(menu.save());
    if(err){
        return ReE(res, err);
    }
    return ReS(res, {menu:menu.toWeb()});
}
module.exports.update = update;

const remove = async function(req, res){
    let menu, err;
    menu = req.menu;

    console.log('deleting menu_id...' + req.params.menu_id);

    console.log('deleting menu...' + JSON.stringify(menu));
    
    [err, menu] = await to(menu.destroy());
    if(err) return ReE(res, 'error occured trying to delete the menu');
    return ReS(res, {message:'Deleted Menu'}, 204);

}
module.exports.remove = remove;