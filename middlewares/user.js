const express = require('express');
const responses = require('../responseFactory');
const error = require("../constants/Errors");
const api = require('../db/dbConnnection');
const constant = require('../constants/constant');

// user api
exports.getIsAuthorized = function (req, res, next) {
    res.send(responses.responseAuthorizeOk());
};

exports.getUserData = function (req, res, next) {
    api.getUserData({email: req.session.user.email}).lean()
        .then((data) => {
            res.send(responses.responseDataOk(data));
        })
        .catch((err) => {
            res.send(responses.responseDataFail(err));
        })
};

exports.getMachinesData = function (req, res, next) {
    api.getUserData({email: req.session.user.email}).lean().then((data) => {
        api.getMachinesDataAgr({
            _id: {$in: data.machines}
        })
            .then((result) => {
                let macs = result.map(function (item) {
                    item.isOwner = (item.owner.toString() === req.session.user.db_id);
                    return item;
                });
                res.send(responses.responseDataOk(macs));
            })
            .catch((err) => {
                res.send(responses.responseDataFail(err));
            });
    });
};

exports.unbindMachine = function (req, res, next) {
    api.getRawMachineData({mac_id: req.body.mac_id}).lean()
        .then((result1) => {
            if (result1.owner.toString() !== req.session.user.db_id) {
                api.updateUser({_id: req.session.user.db_id}, {$pull: {machines: result1._id}}).lean()
                    .then((result2) => {
                        res.send(responses.responseSuccessOk());
                    })
                    .catch((err) => {
                        res.send(responses.responseSuccessFail(error.SERVER_ERROR));
                    })
            } else {
                res.send(responses.responseSuccessFail(error.OPERATION_DENIED));
            }
        })
        .catch((err) => {
            res.send(responses.responseSuccessFail(error.SERVER_ERROR));
        });
};

exports.bindMachine = function (req, res, next) {
    api.getRawMachineData({mac_id: req.body.mac_id}).lean()
        .then((result) => {
            if (result.code === req.body.code) {
                api.updateUser({_id: req.session.user.db_id}, {$addToSet: {machines: result._id}}).lean()
                    .then((result2) => {
                        res.send(responses.responseSuccessOk());
                    })
                    .catch((err) => {
                        res.send(responses.responseSuccessFail(error.SERVER_ERROR));
                    })
            } else {
                res.send(responses.responseSuccessFail(error.ACCESS_DENIED))
            }
        })
        .catch((err) => {
            res.send(responses.responseSuccessFail(error.NOT_FOUND));
        })
};

exports.deleteMachineHistory = function (req, res, next) {
    api.getMachineData({mac_id: req.query.mac_id}).lean()
        .then((result) => {
            if (result.owner.toString() === req.session.user.db_id) {
                api.updateMachine({mac_id: req.query.mac_id}, {prod_state: "normal"}).exec();
                api.deleteMachineLogs({mac_id: req.query.mac_id, is_resolved: {$in: [true, false]}})
                    .then((result2) => {
                        res.send(responses.responseSuccessOk());
                    })
                    .catch((err) => {
                        res.send(responses.responseSuccessFail(error.SERVER_ERROR));
                    })
            } else {
                res.send(responses.responseSuccessFail(error.ACCESS_DENIED));
            }
        })
        .catch((err) => {
            res.send(responses.responseSuccessFail(error.SERVER_ERROR));
        });
};

exports.getMachineLogs = function (req, res, next) {
    api.getMachineLogs({mac_id: req.query.mac_id})
        // .skip(constant.pageLimit * (req.query.page - 1))
        // .limit(constant.pageLimit)
        .sort({date: -1}).lean()
        .then((result) => {
            res.send(responses.responseDataOk(result));
        })
        .catch((err) => {
            res.send(responses.responseDataFail(err));
        })
};

exports.getMachineStatistic = function (req, res, next) {
    let data = {};
    api.getLogsStatistic(req.query.mac_id)
        .then((result) => {
            api.getLogsProductStat(req.query.mac_id)
                .then((result2) => {
                    data.month = result;
                    data.hour = result2;
                    res.send(responses.responseDataOk(data));
                })
                .catch((err) => {
                    res.send(responses.responseDataFail(error));
                });
        })
        .catch((error) => {
            res.send(responses.responseDataFail(error));
        })
};

exports.getStatistic = function (req, res, next) {
    api.getUserData({_id: req.session.user.db_id})
        .then((result) => {
            api.getMachinesStat(result.machines)
                .then((result2) => {
                    res.send(responses.responseDataOk(result2));
                })
                .catch((err) => {
                    console.log(err);
                    res.send(error.DATABASE_FAIL);
                })
        })
        .catch((err) => {
            console.log(err);
            res.send(error.DATABASE_FAIL);
        })
};