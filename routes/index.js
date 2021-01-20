const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('home' );
});

router.get('/login', function(req, res) {
  res.render('login', {
    title: 'Welcome',
  })
});
module.exports = router;