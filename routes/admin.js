var express = require('express');
var router = express.Router();
var adminMiddleware = require('../middlewares/adminApi');
var accessMiddleware = require('../middlewares/accessMiddleware');

router.post('/login', adminMiddleware.login);

router.post('/logout', accessMiddleware.adminAuth, adminMiddleware.logout);

router.get('/statistic', accessMiddleware.adminAuth, adminMiddleware.getStatistic);

router.delete('/deleteuser', accessMiddleware.adminAuth, adminMiddleware.deleteUser);

router.delete('/deletemac', accessMiddleware.adminAuth, adminMiddleware.deleteMachine);

module.exports = router;