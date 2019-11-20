var express = require('express');
var router = express.Router();
var accountMiddleware = require('../middlewares/accountAPI');


router.post('/login', accountMiddleware.loginFunc);

router.post('/register', accountMiddleware.registerNewAccount);

router.post('/logout', accountMiddleware.logoutFunc);

module.exports = router;
