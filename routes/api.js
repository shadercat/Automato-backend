const express = require('express');
const router = express.Router();
const accessMiddleware = require('../middlewares/accessMiddleware');
const apiMiddleware = require('../middlewares/user');
const adminMiddleware = require('../middlewares/admin');

// USER
router.get('/authorized', accessMiddleware.userAuth, apiMiddleware.getIsAuthorized);

router.get('/userdata', accessMiddleware.userAuth, apiMiddleware.getUserData);

// MACHINES
router.get('/machines', accessMiddleware.userAuth, apiMiddleware.getMachinesData);

router.post('/machine', accessMiddleware.userAuth, adminMiddleware.getMachineInfo);

router.post('/bindmachine', accessMiddleware.userAuth, apiMiddleware.bindMachine);

router.post('/unbindmachine', accessMiddleware.userAuth, apiMiddleware.unbindMachine);

router.delete('/deletemachistory', accessMiddleware.userAuth, apiMiddleware.deleteMachineHistory);

router.get('/machinelog', accessMiddleware.userAuth, apiMiddleware.getMachineLogs);

module.exports = router;
