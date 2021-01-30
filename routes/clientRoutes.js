const router = require('express').Router();
const { isPrivate } = require('../middleware/checkSession');
const clientController = require('../controller/clientController');
router.get('/Problem_Status',isPrivate, clientController.ReportList);

router.get('/ProfileInfo',isPrivate, clientController.ShowInfo);
  router.get('/ReportProblem',isPrivate, clientController.Report);
  module.exports = router;