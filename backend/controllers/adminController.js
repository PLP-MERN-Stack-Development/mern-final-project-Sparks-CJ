import User from "../models/User.js";
import Event from "../models/Event.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};

export const adminCreateEvent = async (req, res) => {
  const event = await Event.create(req.body);
  res.json(event);
};

export const adminDeleteEvent = async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: "Event deleted" });
};
