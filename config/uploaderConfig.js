const multer = require('multer');
const fs = require('fs');
const path = require('path');

const FileLocation = path.join(process.cwd(), '/uploads');

fs.existsSync(FileLocation) || fs.mkdirSync(FileLocation);
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, FileLocation)
    },
    filename: function (req, file, cb) {
        const filename = file.fieldname + '-' + Date.now() + "-" + req.user.id + "." + file.originalname.split(".")[1];
        cb(null, filename)
    }
});

module.exports = multer({storage: storage });
