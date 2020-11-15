  
const {Router} = require('express');
const router = Router();

const productsCtrl = require('../controllers/products.controller');

router.get('/', productsCtrl.getProducts);
router.post('/', productsCtrl.createProduct);
router.get('/:id', productsCtrl.getProduct);
router.put('/:id', productsCtrl.editProduct);
router.delete('/:id', productsCtrl.deleteProduct);

module.exports = router;