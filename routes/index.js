const router = require('express').Router();
const indexController = require('../controller/indexController');
const { isPublic} = require('../middlewares/checkSession');
router.get('/', isPublic,(req, res) => {
  res.render('home', {
    active:{active_home: true}
  } );
});
router.get('/home', isPublic,(req, res) => {
  res.render('home' ,{
    active:{active_home: true}
  });
});
router.get('/login',isPublic, function(req, res) {
  res.render('login', {
    active:{active_login: true}
  })
});
router.get('/ContactUs',isPublic, function(req,res){
  res.render('Contact', {
    active:{active_contact: true}
  });
})
router.get('/AboutUs',isPublic, function(req,res){
  res.render('About', {
    active:{active_about: true}
  });
})
router.get('/register', indexController.UnitList);

router.post('/register', indexController.CreateRegistrant);
module.exports = router;