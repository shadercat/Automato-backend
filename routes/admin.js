const express = require('express');
const router = express.Router();
const adminMiddleware = require('../middlewares/admin');
const accessMiddleware = require('../middlewares/accessMiddleware');
const credentialAdminSite = [`${process.env.ADMIN_SITE}`];


router.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', credentialAdminSite);
    next();
});

router.get('/authorized', adminMiddleware.isAuthorized);

router.get('admindata', accessMiddleware.adminAuth, adminMiddleware.getAdminData);

router.post('/login', adminMiddleware.login);

router.post('/logout', accessMiddleware.adminAuth, adminMiddleware.logout);

router.post('/create', accessMiddleware.adminAuth, adminMiddleware.createNewAdmin);

router.get('/statistic', accessMiddleware.adminAuth, adminMiddleware.getStatistic);

router.get('/userdata', accessMiddleware.adminAuth, adminMiddleware.getUserInfo);

router.get('/machine', accessMiddleware.adminAuth, adminMiddleware.getMachineInfo);

router.delete('/deleteuser', accessMiddleware.adminAuth, adminMiddleware.deleteUser);

router.delete('/deletemac', accessMiddleware.adminAuth, adminMiddleware.deleteMachine);

module.exports = router;