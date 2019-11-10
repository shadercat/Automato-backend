var express = require('express');
var router = express.Router();
var responses = require('../responseConstructor');

/* GET home page. */
router.get('/authorized',  function(req, res, next) {
    console.log(req.session.user);
    if(req.session.user){
        res.send(responses.responseAuthorizeOk());
    } else {
        res.send(responses.responseAuthorizeFail("session dosn`t exist"));
    }
});

module.exports = router;
