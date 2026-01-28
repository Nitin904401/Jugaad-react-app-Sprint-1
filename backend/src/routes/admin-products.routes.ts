import { Router } from "express";
import {
  getAllProductsAdmin,
  getPendingProducts,
  approveProduct,
  rejectProduct,
  resubmitProduct,
  getProductByIdAdmin,
  getApprovedProducts,
  unpublishProduct
} from "../controllers/admin-products.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

// All routes require admin authentication
router.use(requireAuth);

router.get("/", getAllProductsAdmin);
router.get("/pending", getPendingProducts);
router.get("/approved", getApprovedProducts);
router.get("/:id", getProductByIdAdmin);
router.put("/:id/approve", approveProduct);
router.put("/:id/reject", rejectProduct);
router.put("/:id/resubmit", resubmitProduct);
router.put("/:id/unpublish", unpublishProduct);

export default router;
