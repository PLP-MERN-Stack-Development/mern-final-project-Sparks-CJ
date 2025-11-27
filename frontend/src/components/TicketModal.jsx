import React from "react";

export default function TicketModal({ ticket }) {
  if (!ticket) return null;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold">Ticket Details</h2>
      <p>Event: {ticket.event?.title}</p>
      <p>Type: {ticket.type}</p>

      {ticket.qrCodeUrl ? (
        <img src={ticket.qrCodeUrl} alt="QR Code" className="w-40 h-40 mt-3" />
      ) : (
        <p>No QR available</p>
      )}
    </div>
  );
}

