var mongoose = require('mongoose');
var Machine = new mongoose.Schema({
    mac_id: {
        type: String,
        unique: true,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    state: {
        type: String,
        default: "offline"
    },
    prod_state: {
        type: String,
        default: "normal"
    },
    products: {
        type: [mongoose.Schema.Types.Mixed]
    },
    name: {
        type: String,
        default: "Machine"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('Machine', Machine);