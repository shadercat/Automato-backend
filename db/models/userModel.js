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
        type: String,
        default: "Username"
    },
    position_type : {
        type: String,
        default: "owner"
    },
    create_time: {
        type: Date,
        default: Date.now()
    },
    machines: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Machines'}],
        default: []
    },
    subscription_type: {
        type: String,
        default: "default"
    },
    comp_description: {
        type: String,
        default: "Nothing there"
    }
});

module.exports = mongoose.model('User', User);