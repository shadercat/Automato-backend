const mongoose = require('mongoose');
const MachineLog = new mongoose.Schema({
    mac_id: {
        type: String,
        required: true
    },
    op_type: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        default: "normal"
    },
    is_resolved: {
        type: Boolean,
        default: true
    },
    descry: {
        type: String,
        default: "undefined"
    },
    date: {
        type: Date,
        default: Date.now()
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
    }
});

module.exports = mongoose.model("MachineLog", MachineLog);