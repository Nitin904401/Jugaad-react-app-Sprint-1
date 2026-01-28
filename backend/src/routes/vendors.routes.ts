import { Router } from "express";
import { getAllVendors, getVendorById, updateVendorStatus, updateVendorTopStatus, deleteVendor } from "../controllers/vendors.controller";
import { requireAuth } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = Router();

// Get all vendors (admin only)
router.get("/", requireAuth, requireRole("admin"), getAllVendors);

// Get single vendor details (admin only)
router.get("/:vendorId", requireAuth, requireRole("admin"), getVendorById);

// Update vendor status (admin only)
router.patch("/:vendorId/status", requireAuth, requireRole("admin"), updateVendorStatus);

// Update vendor top_vendor status (admin only)
router.patch("/:vendorId/top-vendor", requireAuth, requireRole("admin"), updateVendorTopStatus);

// Delete vendor (admin only)
router.delete("/:vendorId", requireAuth, requireRole("admin"), deleteVendor);

export default router;
