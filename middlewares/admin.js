var express = require('express');
var responses = require('../responseFactory');
var api = require('../db/dbConnnection');

exports.login = function (req, res, next) {
    if (req.session.user) return res.send(responses.responseAuthorizeFail("already login as user"));

    api.checkAdmin(req.body)
        .then(function (user) {
            if (user) {
                req.session.user = {id: user._id, email: user.email, db_id: user._id, admin: true};
                res.send(responses.responseAuthorizeOk());
            } else {
                res.send(responses.responseAuthorizeFail('error'));
            }
        })
        .catch(function (error) {
            res.send(responses.responseAuthorizeFail(error));
        })

};

exports.logout = function (req, res, next) {
    if (req.session.user) {
        delete req.session.user;
        res.status(200).send(responses.responseSuccessOk());
    } else {
        res.send(responses.responseSuccessFail("already logout"));
    }
};

exports.createNewAdmin = function (req, res, next) {
    api.createAdmin(req.body)
        .then((result) => {
            res.send(responses.responseSuccessOk());
        })
        .catch((err) => {
            res.send(responses.responseSuccessFail(err));
        })
};

exports.getUserInfo = function (req, res, next) {
    api.getUserData({email: req.body.email}).lean()
        .then((doc) => {
            res.send(responses.responseDataOk(doc))
        })
        .catch((err) => {
            res.send(responses.responseDataFail(err));
        });
};

exports.getMachineInfo = function (req, res, next) {
    api.getMachineData({mac_id: req.body.mac_id}).lean()
        .then((result) => {
            res.send(responses.responseDataOk(result));
        })
        .catch((err) => {
            res.send(responses.responseDataFail(err));
        })
};

exports.getMachineLog = function (req, res, next) {
    api.getMachineLogs({mac_id: req.body.mac_id}).lean()
        .then((result) => {
            res.send(responses.responseDataOk(result));
        })
        .catch((err) => {
            res.send(responses.responseDataFail(err));
        })
};

exports.getStatistic = function (req, res, next) {
    api.machineCount()
        .then((result) => {
            api.userCount()
                .then((result2) => {
                    api.logCount()
                        .then((result3) => {
                            res.send(responses.responseDataOk([result, result2, result3]));
                        })
                        .catch((err) => {
                            res.send(responses.responseDataFail(err));
                        })
                })
                .catch((err) => {
                    res.send(responses.responseDataFail(err));
                })
        })
        .catch((err) => {
            res.send(responses.responseDataFail(err));
        })
};

exports.deleteUser = function (req, res, next) {
    api.deleteUser({email: req.body.email_to_del})
        .then((result) => {
            res.send(responses.responseDataOk(result));
        })
        .catch((err) => {
            res.send(responses.responseDataFail(err));
        });
};

exports.deleteMachine = function (req, res, next) {
    api.deleteMachine({mac_id: req.body.mac_id_to_del})
        .then((result) => {
            api.deleteMachineLogs({mac_id: req.body.mac_id_to_del})
                .then((result2) => {
                    res.send(responses.responseDataOk(result));
                })
                .catch((err) => {
                    res.send(responses.responseDataFail(err));
                })
        })
        .catch((err) => {
            res.send(responses.responseDataFail(err));
        })
};