const router = require('express').Router();
const adminController = require('../controller/adminController');
router.get('/tenant', adminController.TenantList);

  router.get('/rent-calendar', adminController.CalendarShow);
  router.get('/registration-status', adminController.RegisterList);
  router.get('/problem-status', adminController.Problemlist);
   router.get('/',adminController.home)
  router.post('/',adminController.createunit)
  module.exports = router;