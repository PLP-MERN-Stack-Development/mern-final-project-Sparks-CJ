import Event from "./models/Event.js";
import connectDB from "./config/db.js";

await connectDB();

await Event.create({
  title: "Sample Event",
  description: "Demo seeded event",
  date: "2025-04-01"
});

console.log("Seeded");
process.exit();
