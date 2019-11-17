var express = require('express');
var responses = require('./responseFactory');

exports.withAuth = function (req, res, next) {
    if(req.session.user){
        next();
    } else {
        res.send(responses.responseAuthorizeFail("unauthorized"));
    }
};