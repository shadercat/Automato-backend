var express = require('express');
var responses = require('../responseFactory');
const error = require("../constants/Errors");

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