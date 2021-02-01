const router = require('express').Router();
const { isPrivate } = require('../middlewares/checkSession');
const clientController = require('../controller/clientController');
router.get('/Problem_Status',isPrivate, clientController.ReportList);

router.get('/ProfileInfo',isPrivate, clientController.ShowInfo);
router.get('/',isPrivate, clientController.ShowInfo);
router.get('/Contact',isPrivate, function(req,res){
  res.render('Contact2', {
    active:{active_problem: true}
  });
})
  router.get('/ReportProblem',isPrivate, clientController.Report);
  router.post('/CreateProblem', clientController.createProblem);
  module.exports = router;