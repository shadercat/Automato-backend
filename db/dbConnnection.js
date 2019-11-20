var mongoose = require('mongoose');
var crypto = require('crypto');
var db = mongoose.connect("mongodb://localhost:27017/automato", {useNewUrlParser: true, useFindAndModify: false});
var User = require('./models/userModel.js');
var Machine = require('./models/machineModel');
var MachineLog = require('./models/machineLogModel');

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

exports.getUserData = function (query) {
    return User.findOne(query)
        .select({'password': 0});
};

exports.checkUser = function (userData) {
    return User
        .findOne({email: userData.email})
        .then(function (doc) {
            if (doc && doc.password == hash(userData.password)) {
                return Promise.resolve(doc)
            } else {
                return Promise.reject("Email or password is wrong!")
            }
        }).catch()
};

exports.updateUser = function (query, data) {
    return User.findOneAndUpdate(query, data, {new: true});
};

function hash(text) {
    return crypto.createHash('sha1')
        .update(text).digest('base64')
}

// Machine API

exports.createMachine = function (machineData) {
    var machine = {
        mac_id: machineData.mac_id,
        code: machineData.code,
        state: machineData.state,
        prod_state: machineData.prod_state,
        products: machineData.products,
        owner: machineData.owner
    };
    return new Machine(machine).save();
};

exports.getMachineData = function (query) {
    return Machine.findOne(query)
        .select({_id: 0});
};

exports.updateMachine = function (query, data) {
    return Machine.findOneAndUpdate(query, data, {new: true});
};

exports.deleteMachine = function (query) {
    return Machine.deleteOne(query);
};

exports.getMachinesData = function(query) {
    return Machine.find(query);
};

// Machine Log API

exports.setMachineLog = function (macData) {
    let log = {
        mac_id: macData.mac_id,
        op_type: macData.op_type,
        priority: macData.priority,
        is_resolved: macData.is_resolved,
        data: macData.data
    };
    return new MachineLog(log).save();
};

exports.deleteMachineLogs = function (query) {
    return MachineLog.deleteMany(query);
};

exports.getMachineLogs = function (query) {
    return MachineLog.find(query);
};

exports.updateMachineLog = function (query, data) {
    return MachineLog.findOneAndUpdate(query, data, {new: true});
};

exports.getMachineWarnings = function (machine_id) {
    return MachineLog.find({mac_id: machine_id, priority: "warning"});
};