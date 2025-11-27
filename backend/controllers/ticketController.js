// backend/controllers/ticketController.js
import Ticket from "../models/Ticket.js";
import Event from "../models/Event.js";
import QRCode from "qrcode";

export const purchaseTicket = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user.id;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const ticket = await Ticket.create({
      event: eventId,
      user: userId,
      status: "active"
    });

    const qrText = `TICKET:${ticket._id}|USER:${userId}|EVENT:${eventId}`;

    const qrImage = await QRCode.toDataURL(qrText);

    ticket.qrCode = qrImage;
    await ticket.save();

    res.json({
      message: "Ticket purchased successfully",
      ticket
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
