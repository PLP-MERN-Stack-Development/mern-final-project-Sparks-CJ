import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const u = await axios.get("/api/admin/users", getAuth());
    const e = await axios.get("/api/events");
    setUsers(u.data);
    setEvents(e.data);
  };

  const getAuth = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  });

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <h2>All Users</h2>
      <ul>
        {users.map((u) => (
          <li key={u._id}>{u.email}</li>
        ))}
      </ul>

      <h2>All Events</h2>
      <ul>
        {events.map((ev) => (
          <li key={ev._id}>{ev.title}</li>
        ))}
      </ul>
    </div>
  );
}
