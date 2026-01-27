import { Router } from "express";
import { getAllVendors, updateVendorStatus, deleteVendor } from "../controllers/vendors.controller";
import { requireAuth } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = Router();

// Get all vendors (admin only)
router.get("/", requireAuth, requireRole("admin"), getAllVendors);

// Update vendor status (admin only)
router.patch("/:vendorId/status", requireAuth, requireRole("admin"), updateVendorStatus);

// Delete vendor (admin only)
router.delete("/:vendorId", requireAuth, requireRole("admin"), deleteVendor);

export default router;
