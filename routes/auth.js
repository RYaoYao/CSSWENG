const router = require('express').Router();
const userController = require('../controller/indexController');
const { loginValidation} = require('../validator.js');
const { isPublic, isPrivate } = require('../middleware/checkSession');


router.post('/login', isPublic,userController.loginUser);

router.get('/logout', isPrivate, userController.logoutUser);
module.exports = router;