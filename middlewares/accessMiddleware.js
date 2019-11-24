var express = require('express');
var responses = require('../responseFactory');

exports.userAuth = function (req, res, next) {
    if(req.session.user){
        next();
    } else {
        res.send(responses.responseAuthorizeFail("unauthorized"));
    }
};

exports.adminAuth = function (req, res, next) {
    if (req.session.user && req.session.user.admin) {
        next();
    } else {
        res.send(responses.responseAuthorizeFail("access denied"));
    }
};