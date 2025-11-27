const mongoose = require('mongoose');


const eventSchema = new mongoose.Schema({
title: { type: String, required: true },
description: String,
location: String,
venue: String,
startDate: { type: Date, required: true },
endDate: Date,
capacity: Number,
price: { type: Number, default: 0 },
organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Event', eventSchema);
