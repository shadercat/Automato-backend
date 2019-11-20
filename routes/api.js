var express = require('express');
var router = express.Router();
var accessMiddleware = require('../middlewares/accessMiddleware');
var apiMiddleware = require('../middlewares/userAPI');

// USER
router.get('/authorized', accessMiddleware.withAuth, apiMiddleware.getIsAuthorized);

router.get('/userdata', accessMiddleware.withAuth, apiMiddleware.getUserData);

// MACHINES
router.get('/machines', accessMiddleware.withAuth, apiMiddleware.getMachinesData);

router.post('/bindmachine', accessMiddleware.withAuth, apiMiddleware.bindMachine);

router.post('/unbindmachine', accessMiddleware.withAuth, apiMiddleware.unbindMachine);

router.delete('/deletemachistory', accessMiddleware.withAuth, apiMiddleware.deleteMachineHistory);

router.get('/machinelog', accessMiddleware.withAuth, apiMiddleware.getMachineLogs);

module.exports = router;
