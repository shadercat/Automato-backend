const mongoose = require('mongoose');
const User = new mongoose.Schema({
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
    },
    addData: {
        type: mongoose.Schema.Types.Mixed,
        default: {
            number: "0000000000",
            location: "nothing"
        }
    }
}, {
    timestamps: {createdAt: 'create_time'}
});

module.exports = mongoose.model('User', User);