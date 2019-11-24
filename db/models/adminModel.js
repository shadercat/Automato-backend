var mongoose = require('mongoose');
var Admin = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    position: {
        type: String,
        default: "default"
    },
});

module.exports = mongoose.model("Admin", Admin);