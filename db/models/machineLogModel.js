var mongoose = require('mongoose');
var MachineLog = new mongoose.Schema({
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
    data: {
        type: mongoose.Schema.Types.Mixed,
    }
});

module.exports = mongoose.model("MachineLog", MachineLog);