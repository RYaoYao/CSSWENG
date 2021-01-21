const router = require('express').Router();
const indexController = require('../controller/indexController');
router.get('/', (req, res) => {
  res.render('home' );
});

router.get('/login', function(req, res) {
  res.render('login', {
    title: 'Welcome',
  })
});
router.get('/register', indexController.UnitList);

module.exports = router;