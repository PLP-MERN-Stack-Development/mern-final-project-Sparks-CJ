const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }],
totalAmount: Number,
status: { type: String, enum: ['pending','paid','failed'], default: 'pending' },
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Order', orderSchema);
