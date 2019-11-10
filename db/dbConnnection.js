var mongoose = require('mongoose');
var crypto = require('crypto');
var db = mongoose.connect("mongodb://localhost:27017/automato");
var User = require('./models/userModel.js');

// User API

exports.createUser = function (userData) {
    var user = {
        name: userData.name,
        email: userData.email,
        password: hash(userData.password),
        position_type: userData.position_type,
        subscription_type: userData.subscription_type,
        comp_description: userData.comp_description
    };
    return new User(user).save()
};

exports.getUser = function (id) {
    return User.findOne(id)
};

exports.checkUser = function (userData) {
    return User
        .findOne({email: userData.email})
        .then(function (doc) {
            if (doc && doc.password == hash(userData.password)) {
                return Promise.resolve(doc)
            } else {
                return Promise.reject("access is denied")
            }
        })
};

function hash(text) {
    return crypto.createHash('sha1')
        .update(text).digest('base64')
}