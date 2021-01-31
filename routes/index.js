const router = require('express').Router();
const indexController = require('../controller/indexController');
const { isPublic} = require('../middlewares/checkSession');
router.get('/', isPublic,(req, res) => {
  res.render('home' );
});
router.get('/home', isPublic,(req, res) => {
  res.render('home' );
});
router.get('/login',isPublic, function(req, res) {
  res.render('login', {
    title: 'Welcome',
  })
});
router.get('/register', indexController.UnitList);

router.post('/register', indexController.CreateRegistrant);
module.exports = router;