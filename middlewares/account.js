const express = require('express');
const api = require('../db/dbConnection');
const error = require('../constants/Errors');
const responses = require('../responseFactory');

exports.loginFunc = function (req, res, next) {
    if (req.session.user) return res.send(responses.responseAuthorizeFail(error.ALREADY_LOGIN));

    api.checkUser(req.body)
        .then(function (user) {
            if (user) {
                req.session.user = {id: user._id, email: user.email, db_id: user._id};
                res.send(responses.responseAuthorizeOk());
            } else {
                res.send(responses.responseAuthorizeFail(error.SERVER_ERROR));
            }
        })
        .catch(function (error) {
            res.send(responses.responseAuthorizeFail(error));
        })

};

exports.registerNewAccount = function (req, res, next) {
    api.createUser(req.body)
        .then(function (result) {
            res.send(responses.responseSuccessOk());
        })
        .catch(function (err) {
            if (err.code == 11000) {
                res.send(responses.responseSuccessFail(error.DUPLICATE_EMAIL));
            } else {
                res.send(responses.responseSuccessFail(error.SERVER_ERROR));
            }
        })
};

exports.logoutFunc = function (req, res, next) {
    if (req.session.user) {
        delete req.session.user;
        res.status(200).send(responses.responseSuccessOk());
    } else {
        res.send(responses.responseSuccessFail(error.UNAUTHORIZED));
    }
};

exports.updateData = function (req, res, next) {
    let data = {
        name: req.body.name,
        email: req.body.email,
        comp_description: req.body.comp_description,
        position_type: req.body.position_type,
        addData: {
            number: req.body.number,
            location: req.body.location
        }
    };
    api.updateUser({_id: req.session.user.db_id}, data)
        .then((result) => {
            res.send(responses.responseSuccessOk());
        })
        .catch((err) => {
            res.send(responses.responseSuccessFail(error.DATABASE_FAIL));
        })
};
