const { Router } = require('express');
const router = Router();

const usersCtrl = require('../controllers/users.controller');

const tokenValidator = require("../libs/validateToken")



const path = require('path');

srcPath = path.join(__dirname, '..');

console.log(srcPath)



router.get('/', usersCtrl.getUsers);
router.get('/:id', usersCtrl.getUser);
router.post('/logIn', usersCtrl.logIn);
router.post('/signUp', usersCtrl.signUp);
router.get('/profile', usersCtrl.profile);
router.put('/:id', tokenValidator, usersCtrl.editUser);
router.delete('/:id', tokenValidator, usersCtrl.deleteUser);

module.exports = router;