var express = require('express');
var responses = require('./responseConstructor');

const withAuth = function (req, res, next) {
    if(req.session.user){
        next();
    } else {
        res.status(401).send(responses.responseSuccessFail("unauthorized"))
    }
};