const express = require('express');
const router = express.Router();
const accountMiddleware = require('../middlewares/account');
const accessMidl = require('../middlewares/accessMiddleware');


router.post('/login', accountMiddleware.loginFunc);

router.post('/register', accountMiddleware.registerNewAccount);

router.post('/logout', accountMiddleware.logoutFunc);

router.post('/update', accessMidl.userAuth, accountMiddleware.updateData);

module.exports = router;
