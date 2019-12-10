const express = require('express');
const responses = require('../responseFactory');
const error = require("../constants/Errors");
const api = require('../db/dbConnnection');

exports.createNewMachine = function (req, res, next) {
    let data = req.body;
    data.owner = req.session.user.db_id;
    api.createMachine(data)
        .then((result) => {
            api.updateUser({_id: req.session.user.db_id}, {$push: {machines: result._id}}).lean()
                .then((res2) => {
                    res.send(responses.responseSuccessOk());
                })
                .catch((err) => {
                    res.send(responses.responseSuccessFail(error.DATABASE_FAIL));
                });
        })
        .catch((err) => {
            if (err.code === 11000) {
                res.send(responses.responseSuccessFail(error.DUPLICATE_MAC))
            } else {
                res.send(responses.responseSuccessFail(error.DATABASE_FAIL))
            }
        });
};

exports.deleteMachine = function (req, res, next) {
    api.getRawMachineData({mac_id: req.query.mac_id})
        .then((result1) => {
            console.log(req.query);
            console.log(result1);
            if (result1.owner.toString() === req.session.user.db_id && result1.code === req.query.code) {
                api.deleteMachineLogs({mac_id: req.query.mac_id})
                    .then((result) => {
                        api.deleteMachine({mac_id: req.query.mac_id})
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
                res.send(responses.responseSuccessFail(error.ACCESS_DENIED))
            }
        })
        .catch((err) => {
            res.send(responses.responseSuccessFail(error.NOT_FOUND));
        })

};

exports.saveLog = function (req, res, next) {
    api.getRawMachineData({mac_id: req.body.mac_id})
        .then((result) => {
            if (result && result.code === req.body.code) {
                if (req.body.priority === "warning") {
                    api.updateMachine({mac_id: req.body.mac_id}, {prod_state: "warning"}).exec();
                }
                let data = req.body;
                data.data = JSON.parse(req.body.data);
                data.mac_db_id = result._id;
                api.setMachineLog(data)
                    .then((doc) => {
                        res.send(responses.responseSuccessOk());
                    })
                    .catch((err) => {
                        res.send(responses.responseSuccessFail(err));
                    })
            } else {
                res.send(responses.responseSuccessFail(error.ACCESS_DENIED))
            }
        })
        .catch((err) => {
            res.send(responses.responseSuccessFail(error.DATABASE_FAIL));
        });
};

exports.setOffline = function (req, res, next) {
    api.getRawMachineData({mac_id: req.body.mac_id}).lean()
        .then((result) => {
            if (result.code === req.body.code) {
                api.updateMachine({mac_id: result.mac_id}, {state: "offline"}).lean()
                    .then((result2) => {
                        res.send(responses.responseSuccessOk());
                    })
                    .catch((err) => {
                        res.send(responses.responseSuccessFail(err));
                    })
            }
        })
        .catch((err) => {
            res.send(responses.responseSuccessFail(err));
        });
};

exports.setOnline = function (req, res, next) {
    api.getRawMachineData({mac_id: req.body.mac_id}).lean()
        .then((result) => {
            if (result.code === req.body.code) {
                api.updateMachine({mac_id: result.mac_id}, {state: "online"}).lean()
                    .then((result2) => {
                        res.send(responses.responseSuccessOk());
                    })
                    .catch((err) => {
                        res.send(responses.responseSuccessFail(err));
                    })
            }
        })
        .catch((err) => {
            res.send(responses.responseSuccessFail(err));
        });
};

exports.resolveLogWarning = function (req, res, next) {
    api.updateMachineLog({_id: req.body._id}, {is_resolved: true}).lean()
        .then((result) => {
            api.getMachineWarnings(result.mac_id).lean()
                .then((result2) => {
                    let isResolve = true;
                    result2.forEach(function (item, i, arr) {
                        isResolve = isResolve && item.is_resolved;
                    });
                    if (isResolve) {
                        api.updateMachine({mac_id: result.mac_id}, {prod_state: "normal"}).lean()
                            .then((result2) => {
                                res.send(responses.responseSuccessOk());
                            })
                            .catch((err) => {
                                res.send(responses.responseSuccessFail());
                            })
                    } else {
                        res.send(responses.responseSuccessOk());
                    }
                })
        })
        .catch((err) => {
            res.send(responses.responseSuccessFail(err));
        });
};

exports.resolveWarning = function (req, res, next) {
    api.updateMachineLog({mac_id: req.body.mac_id, is_resolved: false}, {is_resolved: true}).lean()
        .then((result) => {
            api.updateMachine({mac_id: req.body.mac_id}, {prod_state: "normal"}).lean()
                .then((result2) => {
                    res.send(responses.responseSuccessOk())
                })
                .catch((err) => {
                    res.send(responses.responseSuccessFail(error.SERVER_ERROR))
                })
        })
        .catch((err) => {
            res.send(responses.responseSuccessFail(error.SERVER_ERROR))
        })
};
exports.getMachineStatistic = function (req, res, next) {

};