const express = require('express');
const Middleware = require('../middlewares/companies');
const AccessMid = require('../middlewares/accessMiddleware');


const router = express.Router();

router.get('/list', Middleware.getCompanies);

router.get('/info', AccessMid.userAuth, Middleware.getCompanyInfo);


// const api = require('../db/dbConnection');
// var crypto = require('crypto');
// router.get('/generator', function (req, res, next) {
//     for (let i = 0; i < parseInt(req.query.num); i++){
//         let user = {
//             name: `comp_name ${i}`,
//             email: `comp_name${i}@email.com`,
//             password: hash("passWord"),
//             position_type: "company",
//             subscription_type: "default",
//             comp_description: `company description for comp_name ${i}`
//         };
//         api.createUser(user);
//     }
//     res.send({success: "dont know"})
// });
// function hash(text) {
//     return crypto.createHash('sha1')
//         .update(text).digest('base64')
// }

module.exports = router;