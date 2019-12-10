const express = require('express');
const router = express.Router();
const accessMiddleware = require('../middlewares/accessMiddleware');
const apiMiddleware = require('../middlewares/user');
const adminMiddleware = require('../middlewares/admin');

// USER
router.get('/authorized', accessMiddleware.userAuth, apiMiddleware.getIsAuthorized);

router.get('/userdata', accessMiddleware.userAuth, apiMiddleware.getUserData);

router.get('/user', accessMiddleware.userAuth, apiMiddleware.getAdvUserData);

router.get('/userstat', accessMiddleware.userAuth, apiMiddleware.getStatistic);

//router.get('/companies', accessMiddleware.userAuth, apiMiddleware.getCompanies);

// MACHINES
router.get('/machines', accessMiddleware.userAuth, apiMiddleware.getMachinesData);

router.get('/machine', accessMiddleware.userAuth, accessMiddleware.isOwnerOfMachine, adminMiddleware.getMachineInfo);

router.get('/machinestat', accessMiddleware.userAuth, apiMiddleware.getMachineStatistic);

router.post('/bindmachine', accessMiddleware.userAuth, apiMiddleware.bindMachine);

router.post('/unbindmachine', accessMiddleware.userAuth, apiMiddleware.unbindMachine);

router.delete('/deletemachistory', accessMiddleware.userAuth, apiMiddleware.deleteMachineHistory);

router.get('/machinelog', accessMiddleware.userAuth, apiMiddleware.getMachineLogs);

module.exports = router;
