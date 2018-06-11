const Setting = require('../models').Setting;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, setting;
    let user = req.user;

    let setting_info = req.body;


    [err, setting] = await to(Setting.create(setting_info));
    if(err) {
        console.log(err);
        return ReE(res, err, 422);
    }

    // setting.addUser(user, { through: { status: 'settingadded' }});

    [err, setting] = await to(setting.save());
    if(err) {
        console.log(err);
        return ReE(res, err, 422);
    }

    let setting_json = setting.toWeb();
    setting_json.users = [{user:user.id}];

    console.log('setting json: ' + JSON.stringify(setting_json));

    return ReS(res,{setting:setting_json}, 201);
}
module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;
    let err, settings;

    // [err, settings] = await to(user.getSettings({include: [ {association: Setting.Users} ] }));
    [err, settings] = await to(Setting.findAll({}));
    // settings.reverse();
    let settings_json =[]
    for( let i in settings){
        let setting = settings[i];
        let setting_info = setting.toWeb();
        settings_json.push(setting_info);
    }

    console.log('c t', settings_json);
    return ReS(res, {settings:settings_json});
}
module.exports.getAll = getAll;

const get = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let setting = req.setting;

    return ReS(res, {setting:setting.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    let err, setting, data;
    setting = req.setting;
    data = req.body;
    setting.set(data);

    [err, setting] = await to(setting.save());
    if(err){
        return ReE(res, err);
    }
    return ReS(res, {setting:setting.toWeb()});
}
module.exports.update = update;

const remove = async function(req, res){
    let setting, err;
    setting = req.setting;

    console.log('deleting setting_id...' + req.params.setting_id);

    console.log('deleting setting...' + JSON.stringify(setting));
    
    [err, setting] = await to(setting.destroy());
    if(err) return ReE(res, 'error occured trying to delete the setting');
    return ReS(res, {message:'Deleted Setting'}, 204);

}
module.exports.remove = remove;