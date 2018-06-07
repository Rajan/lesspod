const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const filename = file.fieldname + '-' + Date.now() + "-" + req.user.id + "." + file.originalname.split(".")[1];
        cb(null, filename)
    }
});

module.exports = multer({storage: storage });
