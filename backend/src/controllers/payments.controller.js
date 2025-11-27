const Order = require('../models/Order');
const Ticket = require('../models/Ticket');

exports.createMockPayment = async (req, res, next) => {
  try {
    const { eventId, quantity = 1, type = 'regular' } = req.body;

    if (!eventId) return res.status(400).json({ message: 'Missing eventId' });

    const tickets = [];

    for (let i = 0; i < quantity; i++) {
      const ticket = await Ticket.create({
        event: eventId,
        buyer: req.userId,
        type,
        price: 0
      });
      tickets.push(ticket);
    }

    const order = await Order.create({
      user: req.userId,
      event: eventId,
      tickets: tickets.map(t => t._id),
      totalAmount: 0,
      status: "paid"
    });

    res.status(201).json({ order, tickets });
  } catch (err) { next(err); }
};
