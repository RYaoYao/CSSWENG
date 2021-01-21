const router = require('express').Router();
const adminController = require('../controller/adminController');
router.get('/tenant', adminController.TenantList);

  router.get('/rent-calendar', adminController.CalendarShow);
  router.get('/registration-status', adminController.RegisterList);
  router.get('/problem-status', adminController.Problemlist);
  router.get('/home',adminController.home)
  router.post('/home',adminController.createunit)
  module.exports = router;