import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  getFeaturedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getVendorProducts,
  toggleFeaturedStatus
} from "../controllers/product.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getAllProducts);
router.get("/test", (_req, res) => res.json({ message: "Test route works!" }));
router.get("/featured", getFeaturedProducts);

// Protected vendor routes
router.get("/vendor/my-products", requireAuth, getVendorProducts);
router.put("/vendor/:id/featured", requireAuth, toggleFeaturedStatus);

router.get("/:id", getProductById);

// Protected routes
router.post("/", requireAuth, createProduct);
router.put("/:id", requireAuth, updateProduct);
router.delete("/:id", requireAuth, deleteProduct);

export default router;
