const { Router } = require('express');
const router = Router();

const usersCtrl = require('../controllers/users.controller');

const tokenValidator = require("../libs/validateToken")

const path = require('path');
srcPath = path.join(__dirname, "..", "/public/uploads/");

var multer = require('multer');
const { time } = require('console');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, srcPath)
    },
    filename: (req, file, cb) => {
        var ext = path.extname(file.originalname)
        cb(null, 'user' + '-' + Date.now() + ext)
    }
});

var maxSize = 4 * 1024 * 1024;

var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Solo se admiten imagenes'))
        }
        callback(null, true)
    },
    limits: { fileSize: maxSize }
}).single('image');

router.get('/', usersCtrl.getUsers);
router.get('/search/:id', usersCtrl.searchUser);
router.get('/:id', usersCtrl.getUser);
router.post('/logIn', usersCtrl.logIn);
router.post('/signUp', upload, usersCtrl.signUp);
router.get('/v1/profile', tokenValidator, usersCtrl.profile);
router.get('/v1/logOut', tokenValidator, usersCtrl.logOut);
router.put('/', [tokenValidator,upload], usersCtrl.editUser);
router.delete('/', tokenValidator, usersCtrl.deleteUser);

module.exports = router;