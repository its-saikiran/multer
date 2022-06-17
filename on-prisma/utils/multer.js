const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'files')
    },
    filename: (req, file, cb) => {
        cb(null, 'image' + path.extname(file.originalname))
    }
})

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if(ext !== '.jpg' && ext !== '.png'){
            return cb("Please upload an image.", false)
        }
        cb(null, true)
    }
})


module.exports = upload;