var express = require('express');
var responses = require('../responseFactory');
var api = require('../db/dbConnnection');

exports.createNewMachine = function (req, res, next) {
    let data = req.body;
    data.owner = req.session.user.db_id;
    api.createMachine(data)
        .then((result) => {
            api.updateUser({_id: req.session.user.db_id}, {$push: {machines: data.indet}}).lean()
                .then((res2) => {
                    res.send(responses.responseSuccessOk());
                })
                .catch((err) => {
                    res.send(responses.responseSuccessFail(err));
                });
        })
        .catch((err) => {
            res.send(responses.responseSuccessFail(err))
        });
};

exports.deleteMachine = function (req, res, next) {
    api.getMachineData({indet: req.body.mac_indet}).lean()
        .then((result1) => {
            if (result1.owner == req.session.user.db_id) {
                api.deleteMachineLogs({mac_indet: req.body.mac_indet})
                    .then((result) => {
                        api.deleteMachine({indet: req.body.mac_indet})
                            .then((result2) => {
                                res.send(responses.responseSuccessOk())
                            })
                            .catch((err) => {
                                res.send(responses.responseSuccessFail(err));
                            })
                    })
                    .catch((err) => {
                        res.send(responses.responseSuccessFail(err));
                    });
            } else {
                res.send(responses.responseSuccessFail("access denied"))
            }
        })
        .catch((err) => {
            res.send(responses.responseSuccessFail(err));
        })

};

exports.saveLog = function (req, res, next) {

};