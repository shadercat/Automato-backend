const express = require('express');
const Middleware = require('../middlewares/companies');
const AccessMid = require('../middlewares/accessMiddleware');
const router = express.Router();

router.get('/list', Middleware.getCompanies);

router.get('/info', AccessMid.userAuth, Middleware.getCompanyInfo);

module.exports = router;