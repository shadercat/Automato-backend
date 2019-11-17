var express = require('express');
var router = express.Router();
var responses = require('../responseFactory');
var accessMid = require('../accessMid');
var api = require('../db/dbConnnection');


router.get('/authorized', accessMid.withAuth, function (req, res, next) {
    res.send(responses.responseAuthorizeOk());
});

router.get('/userdata', accessMid.withAuth, function (req, res, next) {
    api.getUserData({email: req.session.user.email}).then((data) => {
        res.send(responses.responseDataOk(data));
    });
});

router.get('/machines', accessMid.withAuth, function (req, res, next) {
    api.getUserData({email: req.session.user.email}).then((data) => {
        let machineArr = [];
        data.machines.forEach(function (item, i, arr) {
            let dt = api.getMachineData({ident: item});
            machineArr = machineArr.concat([dt]);
        });
        res.send(responses.responseDataOk(machineArr));
    });
});

router.post('/machinelog', accessMid.withAuth, function (req, res, next) {

});



module.exports = router;
