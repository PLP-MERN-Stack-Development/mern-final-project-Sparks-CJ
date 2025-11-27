const mongoose = require('mongoose');


const activitySchema = new mongoose.Schema({
actor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
action: String,
meta: Object,
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('ActivityLog', activitySchema);
