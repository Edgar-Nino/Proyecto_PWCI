  
const {Router} = require('express');
const router = Router();

const categoriesCtrl = require('../controllers/categories.controller');
const tokenValidator = require("../libs/validateToken")

router.get('/', categoriesCtrl.getCategories);
router.post('/',tokenValidator, categoriesCtrl.createCategory);
router.get('/:id', categoriesCtrl.getCategory);
router.put('/:id',tokenValidator, categoriesCtrl.editCategory);
router.delete('/:id',tokenValidator, categoriesCtrl.deleteCategory);

module.exports = router;