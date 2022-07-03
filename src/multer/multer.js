const multer = require('multer')

/* Multer configuration */
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './src/public/imgs')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else
        cb(null, false)
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})

module.exports = upload