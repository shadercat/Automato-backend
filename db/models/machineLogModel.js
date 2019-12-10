const mongoose = require('mongoose');
const MachineLog = new mongoose.Schema({
    mac_id: {
        type: String,
        required: true
    },
    mac_db_id: {
        type: mongoose.Schema.Types.ObjectId,
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
    data: {
        type: mongoose.Schema.Types.Mixed,
    }
}, {
    timestamps: {createdAt: 'date'}
});

module.exports = mongoose.model("MachineLog", MachineLog);