import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { connect } from "mongoose";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/users.routes.js";
import eventRoutes from "./routes/events.routes.js";
import ticketRoutes from "./routes/tickets.routes.js";
import uploadsRoutes from "./routes/uploads.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/uploads", uploadsRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: "Server error" });
});

// Start server
const PORT = process.env.PORT || 5000;

connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
