// frontend/src/components/TicketModal.jsx
import React from "react";

export default function TicketModal({ ticket, onClose }) {
  if (!ticket) return null;

  return (
    <div className="ticket-modal">
      <div className="modal-content">
        <h2>Ticket for {ticket.event.title}</h2>

        <img src={ticket.qrCode} alt="QR Code" style={{ width: "200px" }} />

        <p>Ticket ID: {ticket._id}</p>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}


