const express = require('express');
const router = express.Router();
const accessMid = require('../middlewares/accessMiddleware');
const machineMiddleware = require('../middlewares/machine');

router.put('/log', machineMiddleware.saveLog);

router.put('/create', accessMid.userAuth, machineMiddleware.createNewMachine);

router.delete('/delete', accessMid.userAuth, machineMiddleware.deleteMachine);

router.post('/resolve', accessMid.userAuth, machineMiddleware.resolveLogWarning);

router.post('/setoffline', machineMiddleware.setOffline);

router.post('/setonline', machineMiddleware.setOnline);

module.exports = router;