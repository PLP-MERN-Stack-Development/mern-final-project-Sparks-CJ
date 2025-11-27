import React, { useState } from "react";
import axios from "axios";

export default function CreateEvent() {
  const [data, setData] = useState({
    title: "",
    description: "",
    date: ""
  });

  const submit = async (e) => {
    e.preventDefault();
    await axios.post("/api/admin/event", data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    alert("Event created!");
  };

  return (
    <form onSubmit={submit}>
      <h2>Create Event</h2>

      <input
        placeholder="Title"
        onChange={(e) => setData({ ...data, title: e.target.value })}
      />

      <textarea
        placeholder="Description"
        onChange={(e) => setData({ ...data, description: e.target.value })}
      />

      <input
        type="date"
        onChange={(e) => setData({ ...data, date: e.target.value })}
      />

      <button>Create Event</button>
    </form>
  );
}
