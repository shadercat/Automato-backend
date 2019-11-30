const express = require('express');
const Middleware = require('../middlewares/companies');
const router = express.Router();

router.get('/companies', Middleware.getCompanies);

module.exports = router;