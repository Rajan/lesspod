const User = require('../models').User;
const authService = require('./../services/AuthService');
const fs = require('fs');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;

    if (!body.unique_key && !body.email && !body.phone) {
        return ReE(res, 'Please enter an email or phone number to register.', 400);
    } else if (!body.password) {
        return ReE(res, 'Please enter a password to register.', 400);
    } else {
        let err, user;

        [err, user] = await to(authService.createUser(body));

        if (err) return ReE(res, err, 422);
        return ReS(res, {message: 'Successfully created new user.', user: user.toWeb(), token: user.getJWT()}, 201);
    }
};
module.exports.create = create;

const get = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;

    return ReS(res, {user: user.toWeb()});
};
module.exports.get = get;


/**
 * fetches the profile pic of the signed in user
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const getProfilePic = async function (req, res) {
    if (req.user.profilePic !== null) {
        return fs.createReadStream(req.user.profilePic).pipe(res);
    }
    return ReS(res, {});
};

module.exports.getPic = getProfilePic;

/**
 * uploads Profile Pic for the logged in user
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const updateProfilePic = async function (req, res) {

    /* check if multer was able to upload the file or not*/
    if (req.file) {

        /* delete the old profile pic */
        if (req.user.profilePic !== null && fs.existsSync(req.user.profilePic)) {
            fs.unlinkSync(req.user.profilePic);
        }

        /* save the new profile pic url */
        req.user.profilePic = req.file.path;
        req.user.save();
    }
    else {
        return ReE(res, {message: 'Unable to upload file.'})
    }
    return ReS(res, {message: 'Profile Pic Updated'})
};

module.exports.updatePic = updateProfilePic;

const update = async function (req, res) {
    let err, user, data;
    user = req.user;
    data = req.body;
    user.set(data);

    [err, user] = await to(user.save());
    if (err) {
        if (err.message == 'Validation error') err = 'The email address or phone number is already in use';
        return ReE(res, err);
    }
    return ReS(res, {message: 'Updated User: ' + user.email});
};
module.exports.update = update;

const remove = async function (req, res) {
    let user, err;
    user = req.user;

    [err, user] = await to(user.destroy());
    if (err) return ReE(res, 'error occured trying to delete user');

    return ReS(res, {message: 'Deleted User'}, 204);
};
module.exports.remove = remove;


const login = async function (req, res) {
    const body = req.body;
    let err, user;

    [err, user] = await to(authService.authUser(req.body));
    if (err) return ReE(res, err, 422);

    return ReS(res, {token: user.getJWT(), user: user.toWeb()});
};
module.exports.login = login;
