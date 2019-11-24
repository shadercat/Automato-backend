var express = require('express');
var Middleware = require('../middlewares/companies');
var router = express.Router();

router.get('/companies', Middleware.getCompanies);

module.exports = router;