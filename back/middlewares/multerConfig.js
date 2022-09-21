const path = require('path');
// Middleware Imports

const multer = require("multer");

// Middleware config.
const MIME_TYPE_MAP = {
    "image/jpg": ".jpg",
    "image/jpeg": ".jpeg",
    "image/png": ".png",
    "image/gif": ".gif",
    "image/webp": ".webp"
};

const fileFilter = function (req, file, cb) {
    for (const key in MIME_TYPE_MAP)
        if (path.extname(file.originalname) === MIME_TYPE_MAP[key])
            return cb(null, true)
    return cb(); //new Error('Only images are allowed')
}


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "uploads");
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPE_MAP[file.mimetype];
        callback(null, name + Date.now() + extension);
    },
});

// Export

module.exports = multer({ fileFilter, storage }).single("image");