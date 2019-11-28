var crypto = require('crypto');
var User = require('./models/userModel.js');
var Machine = require('./models/machineModel');
var MachineLog = require('./models/machineLogModel');
var Admin = require('./models/adminModel');
var mongoose = require('mongoose');
var paths = require('../constants/paths');
var db = mongoose.connect(paths.urlToDatabaseMain, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then((res) => {
        console.log("Connect to MongoDB - success ");
    })
    .catch((err) => {
        console.log("Connect to MongoDB - fail ");
        console.log(err);
    });


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

exports.getUsersData = function (query) {
    return User.find(query)
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

exports.deleteUser = function (query) {
    return User.deleteOne(query);
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

exports.getMachinesData = function (query) {
    return Machine.find(query);
};

exports.getMachinesDataAgr = function (query) {
    return Machine.aggregate([
        {$match: query},
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner_data"
            }
        },
        {$unwind: "$owner_data"},
        {
            $project: {
                owner_data: {
                    machines: 0,
                    subscription_type: 0,
                    password: 0,
                    __v: 0
                }
            }
        }
    ]);
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

// ADMIN API

exports.createAdmin = function (data) {
    let admin = {
        email: data.email,
        password: hash(data.password),
        position: data.position
    };
    return new Admin(admin).save();
};

exports.checkAdmin = function (data) {
    return Admin.findOne({email: data.email})
        .then((doc) => {
            if (doc && doc.password == hash(data.password)) {
                return Promise.resolve(doc);
            } else {
                return Promise.reject("Email or password is wrong!");
            }
        }).catch()
};

exports.updateAdmin = function (query, data) {
    return Admin.findOneAndUpdate(query, data, {new: true});
};

//
exports.machineCount = function () {
    return Machine.countDocuments({});
};

exports.userCount = function () {
    return User.countDocuments({});
};

exports.logCount = function () {
    return MachineLog.countDocuments({});
};