const router = require('express').Router();
const adminController = require('../controller/adminController');
const { isPrivate, isPrivateAdmin } = require('../middlewares/checkSession');
router.get('/tenant', adminController.TenantList);

  router.get('/rent-calendar',isPrivateAdmin, adminController.CalendarShow);
  router.get('/registration-status',isPrivateAdmin, adminController.RegisterList);
  router.get('/problem-status',isPrivateAdmin, adminController.Problemlist);
   router.get('/',isPrivateAdmin,adminController.home)
  router.post('/',adminController.createunit)
  router.post('/registration-status', adminController.CreateTenant);
  module.exports = router;