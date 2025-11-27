import express from "express";
import { isAdmin } from "../middleware/admin.js";
import { protect } from "../middleware/auth.js";
import {
  getAllUsers,
  deleteUser,
  adminCreateEvent,
  adminDeleteEvent
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/users", protect, isAdmin, getAllUsers);
router.delete("/user/:id", protect, isAdmin, deleteUser);
router.post("/event", protect, isAdmin, adminCreateEvent);
router.delete("/event/:id", protect, isAdmin, adminDeleteEvent);

export default router;
