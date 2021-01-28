const router = require('express').Router();
const clientController = require('../controller/clientController');
router.get('/Problem_Status', clientController.ReportList);

router.get('/ProfileInfo', clientController.ShowInfo);
  router.get('/ReportProblem', clientController.Report);
  module.exports = router;