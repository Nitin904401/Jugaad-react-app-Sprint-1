import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import {
  getUserAddresses,
  getUserAddress,
  createAddress,
  updateUserAddress,
  deleteAddress,
} from "../controllers/address.controller";

const router = Router();

// Get all user addresses (requires authentication)
router.get("/", requireAuth, getUserAddresses);

// Get single address (requires authentication)
router.get("/:id", requireAuth, getUserAddress);

// Create new address (requires authentication)
router.post("/", requireAuth, createAddress);

// Update address (requires authentication)
router.put("/:id", requireAuth, updateUserAddress);

// Delete address (requires authentication)
router.delete("/:id", requireAuth, deleteAddress);

export default router;
