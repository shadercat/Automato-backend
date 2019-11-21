var express = require('express');
var router = express.Router();
var accessMid = require('../middlewares/accessMiddleware');
var machineMiddleware = require('../middlewares/machineAPI');

router.put('/log', machineMiddleware.saveLog);

router.put('/create', accessMid.userAuth, machineMiddleware.createNewMachine);

router.delete('/delete', accessMid.userAuth, machineMiddleware.deleteMachine);

router.post('/resolve', accessMid.userAuth, machineMiddleware.resolveLogWarning);

router.post('/setoffline', machineMiddleware.setOffline);

router.post('/setonline', machineMiddleware.setOnline);

module.exports = router;