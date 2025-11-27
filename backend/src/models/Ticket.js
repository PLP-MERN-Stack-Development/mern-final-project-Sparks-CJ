const mongoose = require('mongoose');


const ticketSchema = new mongoose.Schema({
event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
type: { type: String, enum: ['regular','vip'], default: 'regular' },
price: Number,
qrCodeUrl: String,
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Ticket', ticketSchema);
