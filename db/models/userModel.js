var mongoose = require('mongoose');
var User = new mongoose.Schema({
    email : {
        type: String,
        unique: true,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    name : {
        type: String
    },
    position_type : {
        type: String
    },
    create_time: {
        type: Date
    },
    machines: [Number],
    subscription_type: String,
    comp_description: String
});

module.exports = mongoose.model('User', User);