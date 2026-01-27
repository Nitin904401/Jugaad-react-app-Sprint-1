import { Router } from "express";
import { getAllUsers, updateUserStatus, deleteUser } from "../controllers/users.controller";
import { requireAuth } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = Router();

// Get all users (admin only)
router.get("/", requireAuth, requireRole("admin"), getAllUsers);

// Update user status (admin only)
router.patch("/:userId/status", requireAuth, requireRole("admin"), updateUserStatus);

// Delete user (admin only)
router.delete("/:userId", requireAuth, requireRole("admin"), deleteUser);

export default router;
