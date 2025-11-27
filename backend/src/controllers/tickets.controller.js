const Ticket = require('../models/Ticket');
const qrcode = require('qrcode');

// Helper — qr payload
async function makeQrPayload(ticket) {
  const payload = {
    ticketId: ticket._id.toString(),
    eventId: ticket.event.toString(),
    buyer: ticket.buyer.toString(),
  };
  return qrcode.toDataURL(JSON.stringify(payload));
}

exports.getMyTickets = async (req, res, next) => {
  try {
    const tickets = await Ticket.find({ buyer: req.userId }).populate('event');
    res.json(tickets);
  } catch (err) { next(err); }
};

exports.createTickets = async (tickets) => {
  const created = [];
  for (const t of tickets) {
    const ticket = await Ticket.create(t);
    ticket.qrCodeUrl = await makeQrPayload(ticket);
    await ticket.save();
    created.push(ticket);
  }
  return created;
};

exports.getTicketById = async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate('event');
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    if (ticket.buyer.toString() !== req.userId)
      return res.status(403).json({ message: 'Forbidden' });
    res.json(ticket);
  } catch (err) { next(err); }
};
