const Setting = require('../models').Setting;
const fs = require('fs');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, setting;
    let user = req.user;

    let setting_info = req.body;


    [err, setting] = await to(Setting.create(setting_info));
    if (err) {
        console.log(err);
        return ReE(res, err, 422);
    }

    // setting.addUser(user, { through: { status: 'settingadded' }});

    [err, setting] = await to(setting.save());
    if (err) {
        console.log(err);
        return ReE(res, err, 422);
    }

    let setting_json = setting.toWeb();
    setting_json.users = [{user: user.id}];

    console.log('setting json: ' + JSON.stringify(setting_json));

    return ReS(res, {setting: setting_json}, 201);
};
module.exports.create = create;

const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;
    let err, settings;

    // [err, settings] = await to(user.getSettings({include: [ {association: Setting.Users} ] }));
    [err, settings] = await to(Setting.findAll({}));
    // settings.reverse();
    let settings_json = [];
    for (let i in settings) {
        let setting = settings[i];
        let setting_info = setting.toWeb();
        settings_json.push(setting_info);
    }

    console.log('c t', settings_json);
    return ReS(res, {settings: settings_json});
};
module.exports.getAll = getAll;

const get = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let setting = req.setting;

    return ReS(res, {setting: setting.toWeb()});
};
module.exports.get = get;

const update = async function (req, res) {
    let err, setting, data;
    setting = req.setting;
    data = req.body;
    setting.set(data);

    [err, setting] = await to(setting.save());
    if (err) {
        return ReE(res, err);
    }
    return ReS(res, {setting: setting.toWeb()});
};
module.exports.update = update;

const remove = async function (req, res) {
    let setting, err;
    setting = req.setting;

    console.log('deleting setting_id...' + req.params.setting_id);

    console.log('deleting setting...' + JSON.stringify(setting));

    [err, setting] = await to(setting.destroy());
    if (err) return ReE(res, 'error occured trying to delete the setting');
    return ReS(res, {message: 'Deleted Setting'}, 204);

};
module.exports.remove = remove;


/* square logo APIs */

/**
 * update Logo of the website
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const updateLogo = async function (req, res) {
    /* check if multer was able to upload the file or not*/
    if (req.file) {
        const [err, setting] = await to(Setting.findOne({where: {name: req.body.logoType}}));
        if (setting) {
            const oldImagePath = setting.value;
            setting.value = req.file.path;
            setting.save();

            /* delete the old image if exists */
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }

            return ReS(res, {message: 'Logo updated'});
        } else {
            let defaultLogo = "images/type.png";
            if (req.body.logoType === "squareLogo") {
                defaultLogo = "images/icon.png"
            }
            const [err, savedSetting] = await to(Setting.create({name: req.body.logoType, value: req.file.path, default: defaultLogo}));
            if (savedSetting) {
                return ReS(res, {message: 'Logo updated'});
            }
        }
    }
    else {
        return ReE(res, {message: 'Unable to upload file'})
    }
    return ReE(res, {message: 'Logo not updated'})
};

module.exports.updateLogo = updateLogo;

/**
 * fetches the profile pic of the signed in user
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const getLogo = async function (req, res) {

    if (req.query.name !== null && req.query.name.trim().length !== 0) {
        const [err, setting] = await to(Setting.findOne({where: {name: req.query.name}}));
        if (setting) {
            return fs.createReadStream(setting.value).pipe(res);
        }
        else {
            if(req.query.name === "squareLogo")
                return fs.createReadStream('images/icon.png').pipe(res);
            else{
                return fs.createReadStream('images/type.png').pipe(res);
            }
        }
    }

    return ReE(res, {message: "Invalid request"});
};

module.exports.getLogo = getLogo;
