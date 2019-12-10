const express = require('express');
const responses = require('../responseFactory');
const error = require("../constants/Errors");
const api = require('../db/dbConnection');
const constant = require('../constants/constant');

exports.getCompanies = function (req, res, next) {
    let page = (req.query.page) ? req.query.page - 1 : 0;
    api.getCompanies()
        .skip(constant.pageLimit * page)
        .limit(constant.pageLimit)
        .lean()
        .then((result) => {
            api.getCompaniesCount()
                .then((count) => {
                    let data = {
                        comp: result,
                        count: count
                    };
                    res.send(responses.responseDataOk(data));
                })
                .catch((err) => {
                    res.send(responses.responseDataFail(error.DATABASE_FAIL));
                });
        })
        .catch((err) => {
            res.send(responses.responseDataFail(error.DATABASE_FAIL));
        });
};

exports.getCompanyInfo = function (req, res, next) {
    api.getCompanyInfo(req.query.email)
        .then((result) => {
            res.send(responses.responseDataOk(result));
        })
        .catch((err) => {
            res.send(responses.responseDataFail(error.DATABASE_FAIL));
        });
};