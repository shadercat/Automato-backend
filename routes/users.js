const express = require('express');
const router = express.Router();
const accountMiddleware = require('../middlewares/account');


router.post('/login', accountMiddleware.loginFunc);

router.post('/register', accountMiddleware.registerNewAccount);

router.post('/logout', accountMiddleware.logoutFunc);

module.exports = router;
