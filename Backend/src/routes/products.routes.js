  
const {Router} = require('express');
const router = Router();

const productsCtrl = require('../controllers/products.controller');

const tokenValidator = require("../libs/validateToken")

const path = require('path');
srcPath = path.join(__dirname, "..", "/public/uploads/");

var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, srcPath)
    },
    filename: (req, file, cb) => {
        var ext = path.extname(file.originalname)
        cb(null, 'product' + '-' + Date.now() + ext)
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

router.get('/', productsCtrl.getProducts);
router.post('/', [tokenValidator, upload], productsCtrl.createProduct);
router.get('/:id', productsCtrl.getProduct);
router.put('/:id', [tokenValidator, upload], productsCtrl.editProduct);
router.delete('/:id', tokenValidator, productsCtrl.deleteProduct);

module.exports = router;