var express = require('express');
var router = express.Router();
var accessMiddleware = require('../middlewares/accessMiddleware');
var apiMiddleware = require('../middlewares/user');

// USER
router.get('/authorized', accessMiddleware.userAuth, apiMiddleware.getIsAuthorized);

router.get('/userdata', accessMiddleware.userAuth, apiMiddleware.getUserData);

// MACHINES
router.get('/machines', accessMiddleware.userAuth, apiMiddleware.getMachinesData);

router.post('/bindmachine', accessMiddleware.userAuth, apiMiddleware.bindMachine);

router.post('/unbindmachine', accessMiddleware.userAuth, apiMiddleware.unbindMachine);

router.delete('/deletemachistory', accessMiddleware.userAuth, apiMiddleware.deleteMachineHistory);

router.get('/machinelog', accessMiddleware.userAuth, apiMiddleware.getMachineLogs);

module.exports = router;
