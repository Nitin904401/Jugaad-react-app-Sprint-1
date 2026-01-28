import { Router } from "express";
import {
  getAllProductsAdmin,
  getPendingProducts,
  approveProduct,
  rejectProduct,
  resubmitProduct,
  getProductByIdAdmin
} from "../controllers/admin-products.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

// All routes require admin authentication
router.use(requireAuth);

router.get("/", getAllProductsAdmin);
router.get("/pending", getPendingProducts);
router.get("/:id", getProductByIdAdmin);
router.put("/:id/approve", approveProduct);
router.put("/:id/reject", rejectProduct);
router.put("/:id/resubmit", resubmitProduct);

export default router;
