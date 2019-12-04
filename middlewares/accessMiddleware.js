const express = require('express');
const responses = require('../responseFactory');
const error = require("../constants/Errors");
const api = require('../db/dbConnnection');

exports.userAuth = function (req, res, next) {
    if(req.session.user){
        next();
    } else {
        res.send(responses.responseAuthorizeFail(error.UNAUTHORIZED));
    }
};

exports.adminAuth = function (req, res, next) {
    if (req.session.user && req.session.user.admin) {
        next();
    } else {
        res.send(responses.responseAuthorizeFail(error.ACCESS_DENIED));
    }
};

exports.isOwnerOfMachine = function (req, res, next) {
    api.getMachineData({mac_id: req.query.mac_id}).lean()
        .then((result1) => {
            if (result1 !== null) {
                api.getUserData({_id: req.session.user.db_id, machines: result1._id.toString()}).lean()
                    .then((result2) => {
                        if (result2 !== null) {
                            next();
                        } else {
                            res.send(responses.responseDataFail(error.ACCESS_DENIED));
                        }
                    })
                    .catch((err) => {
                        res.send(responses.responseDataFail(error.SERVER_ERROR));
                    })
            } else {
                res.send(responses.responseDataFail(error.NOT_FOUND));
            }
        })
        .catch((err) => {
            res.send(responses.responseDataFail(error.SERVER_ERROR));
        })
};