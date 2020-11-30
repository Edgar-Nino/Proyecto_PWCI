const {Router} = require('express');
const router = Router();

const listsCtrl = require('../controllers/lists.controller');

const tokenValidator = require("../libs/validateToken")
const tokenValidatorList = require("../libs/validateTokenList")

const path = require('path');
srcPath = path.join(__dirname, "..", "/public/uploads/");

var multer = require('multer');
const validateToken = require('../libs/validateToken');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, srcPath)
    },
    filename: (req, file, cb) => {
        var ext = path.extname(file.originalname)
        cb(null, 'list' + '-' + Date.now() + ext)
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

router.get('/', listsCtrl.getLists);
router.get('/nav/:id', listsCtrl.getListsNav);
router.post('/myLists', tokenValidator, listsCtrl.myLists);
router.post('/', [tokenValidator, upload], listsCtrl.createList);
router.get('/listproducts/:id', tokenValidatorList, listsCtrl.getListProducts);
router.get('/search/:id/:page', tokenValidatorList, listsCtrl.searchList);
router.get('/:id', tokenValidatorList, listsCtrl.getList);
router.get('/isMyList/:id', tokenValidatorList, listsCtrl.isMyList);
router.put('/:id', [tokenValidator, upload], listsCtrl.editList);
router.delete('/:id', tokenValidator , listsCtrl.deleteList);

module.exports = router;