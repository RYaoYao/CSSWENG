const router = require('express').Router();
const userController = require('../controller/indexController');
const { loginValidation} = require('../validator.js');
const { isPublic, isPrivate, isPrivateAdmin } = require('../middlewares/checkSession');


router.post('/login', isPublic,loginValidation,userController.loginUser);

router.get('/logout', isPrivate, userController.logoutUser);
router.get('/logoutAdmin', isPrivateAdmin, userController.logoutUser);
module.exports = router;