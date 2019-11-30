const express = require('express');
const responses = require('../responseFactory');
const error = require("../constants/Errors");
const api = require('../db/dbConnnection');

exports.getCompanies = function (req, res, next) {
    api.getUsersData({position_type: "company"}).lean()
        .then((result) => {
            res.send(responses.responseDataOk(result));
        })
        .catch((err) => {
            res.send(responses.responseDataFail(error.DATABASE_FAIL));
        })
};