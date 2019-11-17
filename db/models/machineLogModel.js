var mongoose = require('mongoose');
var MachineLog = new mongoose.Schema({
    mac_indet: {
        type: String,
        required: true
    },
    op_type: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        default: "default"
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
    }
});

module.exports = mongoose.model("MachineLog", MachineLog);