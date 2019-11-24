var express = require('express');
var responses = require('../responseFactory');
var api = require('../db/dbConnnection');

exports.getCompanies = function (req, res, next) {
    api.getUsersData({position_type: "company"}).lean()
        .then((result) => {
            res.send(responses.responseDataOk(result));
        })
        .catch((err) => {
            res.send(responses.responseDataFail(err));
        })
};