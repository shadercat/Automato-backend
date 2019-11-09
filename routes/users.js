var express = require('express');
var router = express.Router();
var api = require('../db/dbConnnection');

router.post('/login', function(req, res, next) {
  if (req.session.email) return res.redirect('/');

  api.checkUser(req.body)
      .then(function(user){
        if(user){
          req.session.user = {id: user._id, email: user.email};
          console.log(user.toString());
          res.send(true);
        } else {
          return next(error)
        }
      })
      .catch(function(error){
        return next(error)
      })

});

router.post('/', function(req, res, next) {
  api.createUser(req.body)
      .then(function(result){
        console.log("User created")
      })
      .catch(function(err){
        if (err.code == 11000){
          res.status(500).send("This email already exist")
        }
      })
});

router.post('/logout', function(req, res, next) {
  if (req.session.user) {
    delete req.session.user;
    console.log("logout");
    res.redirect('/')
  }
});

module.exports = router;
