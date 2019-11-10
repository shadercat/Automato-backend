var express = require('express');
var router = express.Router();
var api = require('../db/dbConnnection');
var responses = require('../responseConstructor');


router.post('/login', function (req, res, next) {
    if (req.session.user) return res.send(responses.responseAuthorizeFail("already login"));

    api.checkUser(req.body)
        .then(function (user) {
            if (user) {
                req.session.user = {id: user._id, email: user.email};
                res.send(responses.responseAuthorizeOk());
            } else {
                res.send(responses.responseAuthorizeFail('error'));
            }
        })
        .catch(function (error) {
            res.send(responses.responseAuthorizeFail(error));
        })

});

router.post('/', function (req, res, next) {
    api.createUser(req.body)
        .then(function (result) {
            console.log("User created");
            res.send(responses.responseSuccessOk());
        })
        .catch(function (err) {
            if (err.code == 11000) {
                res.send(responses.responseSuccessFail("email already exist"));
            }
        })
});

router.post('/logout', function (req, res, next) {
    if (req.session.user) {
        delete req.session.user;
        console.log("logout");
        res.send(responses.responseSuccessOk())
    }
});

module.exports = router;
